import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/authorize";
import { validate } from "../../middleware/validate";

import * as controller from "./category.controller";
import { categoryIdSchema, createCategorySchema, restaurantIdSchema, updateCategorySchema } from "./category.validator";
import menuItemRoutes from "../menu-items/menu-item.routes";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authenticate,
  authorizeRoles("owner"),
  validate(createCategorySchema),
  controller.createCategory,
);
router.get("/", validate(restaurantIdSchema), controller.getCategories);
router.get("/:categoryId", validate(categoryIdSchema), controller.getCategory);
router.patch(
  "/:categoryId",
  authenticate,
  authorizeRoles("owner"),
  validate(updateCategorySchema),
  controller.updateCategory,
);
router.delete(
  "/:categoryId",
  authenticate,
  authorizeRoles("owner"),
  validate(categoryIdSchema),
  controller.deleteCategory,
);

router.use("/:categoryId/menu-items", menuItemRoutes);

export default router;
