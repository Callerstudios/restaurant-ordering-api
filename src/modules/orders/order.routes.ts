import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/authorize";
import { cancelOrderSchema, createOrderSchema, getOrdersSchema, getRestaurantOrdersSchema, orderIdSchema, updateOrderStatusSchema } from "./order.validator";
import { validate } from "../../middleware/validate";
import * as orderController from "./order.controller"

const router  = Router()

router.post(
  "/",
  authenticate,
  authorizeRoles("customer"),
  validate(createOrderSchema),
  orderController.createOrder,
);
router.get(
  "/",
  authenticate,
  authorizeRoles("customer"),
  validate(getOrdersSchema),
  orderController.getOrders,
);
router.get(
  "/:orderId",
  authenticate,
  authorizeRoles("customer"),
  validate(orderIdSchema),
  orderController.getOrder,
);
router.get(
  "/:restaurantId/orders",
  authenticate,
  authorizeRoles("owner"),
  validate(getRestaurantOrdersSchema),
  orderController.getRestaurantOrders,
);
router.patch(
  "/orders/:orderId/status",
  authenticate,
  authorizeRoles("owner"),
  validate(updateOrderStatusSchema),
  orderController.updateOrderStatus,
);
router.patch(
  "/:orderId/cancel",
  authenticate,
  authorizeRoles("customer"),
  validate(cancelOrderSchema),
  orderController.cancelOrder,
);
export default router