import { asyncHandler } from "../../utils/async-handler";
import { successResponse } from "../../utils/api-response";
import { menuItemService } from "./menu-item.service";

export const createMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await menuItemService.create({
    restaurantId: Number(req.params.restaurantId),
    categoryId: Number(req.params.categoryId),
    ownerId: req.user!.userId,

    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });

  successResponse(res, 201, "Menu item created successfully", menuItem);
});
export const getMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await menuItemService.findByCategory(
    Number(req.params.restaurantId),
    Number(req.params.categoryId),
  );

  successResponse(res, 200, "Menu items retrieved successfully", menuItems);
});
export const getMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await menuItemService.findById(
    Number(req.params.restaurantId),
    Number(req.params.categoryId),
    Number(req.params.menuItemId),
  );

  successResponse(res, 200, "Menu item retrieved successfully", menuItem);
});
export const updateMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await menuItemService.update({
    restaurantId: Number(req.params.restaurantId),
    categoryId: Number(req.params.categoryId),
    menuItemId: Number(req.params.menuItemId),
    ownerId: req.user!.userId,
    data: req.body,
  });

  successResponse(res, 200, "Menu item updated successfully", menuItem);
});
export const deleteMenuItem = asyncHandler(async (req, res) => {
  await menuItemService.delete({
    restaurantId: Number(req.params.restaurantId),
    categoryId: Number(req.params.categoryId),
    menuItemId: Number(req.params.menuItemId),
    ownerId: req.user!.userId,
  });

  successResponse(res, 200, "Menu item deleted successfully", null);
});