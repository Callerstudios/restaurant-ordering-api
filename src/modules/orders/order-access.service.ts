import { OrderDetails } from "./order.types";
import { orderRepository } from "./order.repository";
import { ApiError } from "../../utils/api-error";
import { restaurantAccessService } from "../restaurants/restaurant-access.service";

async function requireOrder(orderId: number): Promise<OrderDetails> {
  const order = await orderRepository.findDetailsById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
}
async function requireCustomerOrder(
  orderId: number,
  customerId: number,
): Promise<OrderDetails> {
  const order = await requireOrder(orderId);

  if (order.customerId !== customerId) {
    throw new ApiError(403, "You do not have access to this order");
  }

  return order;
}
async function requireRestaurantOrder(
  orderId: number,
  ownerId: number,
): Promise<OrderDetails> {
  const order = await requireOrder(orderId);

  await restaurantAccessService.requireOwnedRestaurant(
    order.restaurantId,
    ownerId,
  );

  return order;
}
export const orderAccessService = {
  requireOrder,
  requireCustomerOrder,
  requireRestaurantOrder
};