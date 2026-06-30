import { ApiError } from "../../utils/api-error";
import { restaurantAccessService } from "../restaurants/restaurant-access.service";
import { categoryRepository } from "./category.repository";
import { Category, CreateCategoryDto, DeleteCategoryRequest, UpdateCategoryRequest } from "./category.types";

async function create(data: CreateCategoryDto) {
  // Verify restaurant exists and belongs to this owner
  await restaurantAccessService.requireOwnedRestaurant(
    data.restaurantId,
    data.ownerId,
  );

  // Check duplicate category name
  const existing = await categoryRepository.findByRestaurantAndName(
    data.restaurantId,
    data.name,
  );

  if (existing) {
    throw new ApiError(409, "Category already exists");
  }

  // Create category
  const categoryId = await categoryRepository.create(data);

  // Retrieve created category
  const category = await categoryRepository.findById(
    data.restaurantId,
    categoryId,
  );

  if (!category) {
    throw new ApiError(500, "Failed to create category");
  }

  return category;
}
// category.service.ts

async function findByRestaurant(restaurantId: number) {
  // Throws 404 if the restaurant doesn't exist
  await restaurantAccessService.requireRestaurant(restaurantId);

  return categoryRepository.findByRestaurant(restaurantId);
}
async function findById(restaurantId: number, categoryId: number) {
  // Ensure the restaurant exists
  await restaurantAccessService.requireRestaurant(restaurantId);

  return requireCategory(restaurantId, categoryId);
}
async function update(request: UpdateCategoryRequest) {
  // Verify ownership of the restaurant
  await restaurantAccessService.requireOwnedRestaurant(
    request.restaurantId,
    request.ownerId,
  );

  // Verify category exists
  await requireCategory(request.restaurantId, request.categoryId);

  // Prevent duplicate names
  if (request.data.name) {
    const existing = await categoryRepository.findByRestaurantAndName(
      request.restaurantId,
      request.data.name,
    );

    if (existing && existing.id !== request.categoryId) {
      throw new ApiError(409, "Category already exists");
    }
  }

  await categoryRepository.update(
    request.restaurantId,
    request.categoryId,
    request.data,
  );

  return categoryRepository.findById(request.restaurantId, request.categoryId);
}
async function remove(request: DeleteCategoryRequest): Promise<void> {
  // Verify restaurant ownership
  await restaurantAccessService.requireOwnedRestaurant(
    request.restaurantId,
    request.ownerId,
  );

  // Verify category exists
  await requireCategory(request.restaurantId, request.categoryId);

  await categoryRepository.delete(request.restaurantId, request.categoryId);
}

export const categoryService = {
  create,
  findByRestaurant,
  findById,
  update,
  delete: remove
};

async function requireCategory(
  restaurantId: number,
  categoryId: number,
): Promise<Category> {
  const category = await categoryRepository.findById(restaurantId, categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
}