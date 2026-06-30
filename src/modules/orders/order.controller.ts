import { z } from "zod";
import { successResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";
import { OrderStatus } from "./order.constants";
import { orderService } from "./order.service";
import { getOrdersSchema, getRestaurantOrdersSchema } from "./order.validator";

// type GetOrdersQuery = z.infer<typeof getOrdersSchema>["query"];

export const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.create({
    customerId: req.user!.userId,
    restaurantId: req.body.restaurantId,
    items: req.body.items,
  });

  successResponse(res, 201, "Order created successfully", order);
});
export const getOrder = asyncHandler(async (req, res) => {
  const order = await orderService.getById({
    orderId: Number(req.params.orderId),
    customerId: req.user!.userId,
  });

  successResponse(res, 200, "Order retrieved successfully", order);
});
export const getOrders = asyncHandler(async (req, res) => {
  const query = getOrdersSchema.shape.query.parse(req.query);

  const result = await orderService.getOrders({
    customerId: req.user!.userId,
    ...query,
  });

  successResponse(
    res,
    200,
    "Orders retrieved successfully",
    result.orders,
    result.pagination,
  );
});
export const getRestaurantOrders = asyncHandler(async (req, res) => {
  //   const query = req.query as z.infer<typeof getRestaurantOrdersSchema>["query"];
  const query = getRestaurantOrdersSchema.shape.query.parse(req.query);

  const result = await orderService.getRestaurantOrders({
    ownerId: req.user!.userId,
    restaurantId: Number(req.params.restaurantId),
    ...query,
  });

  successResponse(
    res,
    200,
    "Orders retrieved successfully",
    result.orders,
    result.pagination,
  );
});
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateStatus({
    ownerId: req.user!.userId,
    orderId: Number(req.params.orderId),
    status: req.body.status,
  });

  successResponse(res, 200, "Order status updated successfully", order);
});
export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await orderService.cancelOrder({
    customerId: req.user!.userId,
    orderId: Number(req.params.orderId),
  });

  successResponse(res, 200, "Order cancelled successfully", order);
});