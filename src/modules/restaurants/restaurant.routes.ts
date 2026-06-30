import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/authorize";
import { validate } from "../../middleware/validate";
import {
  createRestaurantSchema,
  restaurantIdSchema,
  updateRestaurantSchema,
} from "./restaurant.validator";
import * as controller from "./restaurant.controller";
import categoryRoutes from "../categories/category.routes";

const router = Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("owner"),
  validate(createRestaurantSchema),
  controller.createRestaurant,
);
router.get("/", controller.getRestaurants);
router.get("/:id", validate(restaurantIdSchema), controller.getRestaurant);
router.patch(
  "/:id",
  authenticate,
  authorizeRoles("owner"),
  validate(updateRestaurantSchema),
  controller.updateRestaurant,
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("owner"),
  validate(restaurantIdSchema),
  controller.deleteRestaurant,
);
router.use("/:restaurantId/categories", categoryRoutes);
export default router;
