import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/authorize";
import { validate } from "../../middleware/validate";

import * as controller from "./menu-item.controller";
import { categoryParamsSchema, createMenuItemSchema, menuItemIdSchema, updateMenuItemSchema } from "./menu-item.validator";

const router = Router({
  mergeParams: true,
});

router.post(
  "/",
  authenticate,
  authorizeRoles("owner"),
  validate(createMenuItemSchema),
  controller.createMenuItem,
);
router.get("/", validate(categoryParamsSchema), controller.getMenuItems);
router.get("/:menuItemId", validate(menuItemIdSchema), controller.getMenuItem);
router.patch(
  "/:menuItemId",
  authenticate,
  authorizeRoles("owner"),
  validate(updateMenuItemSchema),
  controller.updateMenuItem,
);
router.delete(
  "/:menuItemId",
  authenticate,
  authorizeRoles("owner"),
  validate(menuItemIdSchema),
  controller.deleteMenuItem,
);
export default router;
