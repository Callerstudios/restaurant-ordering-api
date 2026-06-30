import { ApiError } from "../../utils/api-error";
import { restaurantAccessService } from "../restaurants/restaurant-access.service";
import { categoryRepository } from "./category.repository";
import { Category } from "./category.types";

async function requireCategory(
  restaurantId: number,
  categoryId: number,
): Promise<Category> {
  // Verify the restaurant exists
  await restaurantAccessService.requireRestaurant(restaurantId);

  const category = await categoryRepository.findById(restaurantId, categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
}
async function requireOwnedCategory(
  restaurantId: number,
  categoryId: number,
  ownerId: number,
) {
  await restaurantAccessService.requireOwnedRestaurant(restaurantId, ownerId);

  return requireCategory(restaurantId, categoryId);
}
export const categoryAccessService = {
  requireCategory,
  requireOwnedCategory,
};