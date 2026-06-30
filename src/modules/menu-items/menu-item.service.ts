import { ApiError } from "../../utils/api-error";
import { categoryAccessService } from "../categories/category-access.service";
import { menuItemRepository } from "./menu-item.repository";
import { CreateMenuItemDto, DeleteMenuItemRequest, MenuItem, UpdateMenuItemDto } from "./menu-item.types";

interface UpdateMenuItemRequest {
  restaurantId: number;
  categoryId: number;
  menuItemId: number;
  ownerId: number;
  data: UpdateMenuItemDto;
}

async function create(data: CreateMenuItemDto) {
  await categoryAccessService.requireOwnedCategory(
    data.restaurantId,
    data.categoryId,
    data.ownerId,
  );

  const existing = await menuItemRepository.findByCategoryAndName(
    data.categoryId,
    data.name,
  );

  if (existing) {
    throw new ApiError(409, "Menu item already exists");
  }

  const menuItemId = await menuItemRepository.create(data);

  const menuItem = await menuItemRepository.findById(
    data.categoryId,
    menuItemId,
  );

  if (!menuItem) {
    throw new ApiError(500, "Failed to create menu item");
  }

  return menuItem;
}
async function findByCategory(restaurantId: number, categoryId: number) {
  // Ensures:
  // - restaurant exists
  // - category exists under that restaurant
  await categoryAccessService.requireCategory(restaurantId, categoryId);

  return menuItemRepository.findByCategory(categoryId);
}
async function findById(
  restaurantId: number,
  categoryId: number,
  menuItemId: number,
) {
  await categoryAccessService.requireCategory(restaurantId, categoryId);

  return requireMenuItem(categoryId, menuItemId);
}


async function update(request: UpdateMenuItemRequest) {
  // Verify owner owns this category
  await categoryAccessService.requireOwnedCategory(
    request.restaurantId,
    request.categoryId,
    request.ownerId,
  );

  // Verify menu item exists
  await requireMenuItem(request.categoryId, request.menuItemId);

  // Prevent duplicate names
  if (request.data.name) {
    const existing = await menuItemRepository.findByCategoryAndName(
      request.categoryId,
      request.data.name,
    );

    if (existing && existing.id !== request.menuItemId) {
      throw new ApiError(409, "Menu item already exists");
    }
  }

  await menuItemRepository.update(
    request.categoryId,
    request.menuItemId,
    request.data,
  );

  return menuItemRepository.findById(request.categoryId, request.menuItemId);
}
async function remove(request: DeleteMenuItemRequest): Promise<void> {
  // Verify the owner owns the category
  await categoryAccessService.requireOwnedCategory(
    request.restaurantId,
    request.categoryId,
    request.ownerId,
  );

  // Verify the menu item exists
  await requireMenuItem(request.categoryId, request.menuItemId);

  await menuItemRepository.delete(request.categoryId, request.menuItemId);
}
export const menuItemService = {
  create,
  findByCategory,
  findById,
  update,
  delete: remove,
};

async function requireMenuItem(
  categoryId: number,
  menuItemId: number,
): Promise<MenuItem> {
  const menuItem = await menuItemRepository.findById(categoryId, menuItemId);

  if (!menuItem) {
    throw new ApiError(404, "Menu item not found");
  }

  return menuItem;
}