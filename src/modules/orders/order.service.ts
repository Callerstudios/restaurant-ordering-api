import { db } from "../../database/db";
import { ApiError } from "../../utils/api-error";
import { menuItemRepository } from "../menu-items/menu-item.repository";
import { restaurantAccessService } from "../restaurants/restaurant-access.service";
import { orderAccessService } from "./order-access.service";
import {
  ALLOWED_ORDER_STATUS_TRANSITIONS,
  ORDER_STATUS,
  OrderStatus,
} from "./order.constants";
import { orderRepository } from "./order.repository";
import {
    CancelOrderRequest,
  CreateOrderItemData,
  CreateOrderRequest,
  GetOrderRequest,
  GetOrdersRequest,
  GetRestaurantOrdersRequest,
  OrderDetails,
  PaginatedOrders,
  UpdateOrderStatusRequest,
} from "./order.types";

async function prepareOrderItems(
  request: CreateOrderRequest,
): Promise<CreateOrderItemData[]> {
  const menuItems = await menuItemRepository.findByIds(
    request.items.map((item) => item.menuItemId),
  );

  const menuItemMap = new Map(menuItems.map((item) => [item.id, item]));

  const orderItems: CreateOrderItemData[] = [];

  for (const item of request.items) {
    const menuItem = menuItemMap.get(item.menuItemId);

    if (!menuItem) {
      throw new ApiError(404, `Menu item ${item.menuItemId} not found`);
    }

    if (menuItem.restaurantId !== request.restaurantId) {
      throw new ApiError(
        400,
        "Menu items must belong to the selected restaurant",
      );
    }

    if (!menuItem.isAvailable) {
      throw new ApiError(400, `${menuItem.name} is unavailable`);
    }

    orderItems.push({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      unitPrice: menuItem.price,
      subtotal: menuItem.price * item.quantity,
    });
  }

  return orderItems;
}
function calculateTotal(items: CreateOrderItemData[]): number {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}

async function create(request: CreateOrderRequest): Promise<OrderDetails> {
  // Ensure the restaurant exists
  await restaurantAccessService.requireRestaurant(request.restaurantId);

  // Validate menu items and calculate subtotals
  const orderItems = await prepareOrderItems(request);

  // Calculate order total
  const totalAmount = calculateTotal(orderItems);

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const orderId = await orderRepository.create(connection, {
      customerId: request.customerId,
      restaurantId: request.restaurantId,
      status: ORDER_STATUS.PENDING,
      totalAmount,
    });

    await orderRepository.createItems(connection, orderId, orderItems);

    await connection.commit();

    const order = await orderRepository.findDetailsById(orderId);

    if (!order) {
      throw new ApiError(500, "Failed to retrieve created order");
    }

    return order;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
async function getById(request: GetOrderRequest): Promise<OrderDetails> {
  return await orderAccessService.requireCustomerOrder(
    request.orderId,
    request.customerId,
  );
}
async function getOrders(request: GetOrdersRequest): Promise<PaginatedOrders> {
  const [orders, total] = await Promise.all([
    orderRepository.findByCustomer(request),
    orderRepository.countByCustomer(request),
  ]);

  return {
    orders,
    pagination: {
      page: request.page,
      limit: request.limit,
      total,
      totalPages: Math.ceil(total / request.limit),
    },
  };
}
async function getRestaurantOrders(
  request: GetRestaurantOrdersRequest,
): Promise<PaginatedOrders> {
  await restaurantAccessService.requireOwnedRestaurant(
    request.restaurantId,
    request.ownerId,
  );

  const [orders, total] = await Promise.all([
    orderRepository.findByRestaurant(request),
    orderRepository.countByRestaurant(request),
  ]);

  return {
    orders,
    pagination: {
      page: request.page,
      limit: request.limit,
      total,
      totalPages: Math.ceil(total / request.limit),
    },
  };
}
async function updateStatus(
  request: UpdateOrderStatusRequest,
): Promise<OrderDetails> {
  const order = await orderAccessService.requireRestaurantOrder(
    request.orderId,
    request.ownerId,
  );

  ensureValidStatusTransition(order.status, request.status);

  await orderRepository.updateStatus(order.id, request.status);

  const updatedOrder = await orderRepository.findDetailsById(order.id);

  if (!updatedOrder) {
    throw new ApiError(500, "Failed to retrieve updated order");
  }

  return updatedOrder;
}
async function cancelOrder(request: CancelOrderRequest): Promise<OrderDetails> {
  const order = await orderAccessService.requireCustomerOrder(
    request.orderId,
    request.customerId,
  );

  ensureOrderCanBeCancelled(order.status);

  await orderRepository.updateStatus(order.id, ORDER_STATUS.CANCELLED);

  const updatedOrder = await orderRepository.findDetailsById(order.id);

  if (!updatedOrder) {
    throw new ApiError(500, "Failed to retrieve updated order");
  }

  return updatedOrder;
}
export const orderService = {
  create,
  getById,
  getOrders,
  getRestaurantOrders,
  updateStatus,
  cancelOrder
};
function ensureValidStatusTransition(
  current: OrderStatus,
  next: OrderStatus,
): void {
  const allowed = ALLOWED_ORDER_STATUS_TRANSITIONS[current];

  if (!allowed.includes(next)) {
    throw new ApiError(
      400,
      `Cannot change order status from ${current} to ${next}`,
    );
  }
}
function ensureOrderCanBeCancelled(status: OrderStatus): void {
  if (status !== ORDER_STATUS.PENDING) {
    throw new ApiError(400, "Only pending orders can be cancelled");
  }
}