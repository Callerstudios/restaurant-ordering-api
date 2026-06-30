import { asyncHandler } from "../../utils/async-handler";
import { successResponse } from "../../utils/api-response";
import { categoryService } from "./category.service";

export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.create({
    restaurantId: Number(req.params.restaurantId),
    ownerId: req.user!.userId,
    name: req.body.name,
  });

  successResponse(res, 201, "Category created successfully", category);
});
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.findByRestaurant(
    Number(req.params.restaurantId),
  );

  successResponse(res, 200, "Categories retrieved successfully", categories);
});
export const getCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.findById(
    Number(req.params.restaurantId),
    Number(req.params.categoryId),
  );

  successResponse(res, 200, "Category retrieved successfully", category);
});
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.update({
    restaurantId: Number(req.params.restaurantId),
    categoryId: Number(req.params.categoryId),
    ownerId: req.user!.userId,
    data: req.body,
  });

  successResponse(res, 200, "Category updated successfully", category);
});
export const deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.delete({
    restaurantId: Number(req.params.restaurantId),
    categoryId: Number(req.params.categoryId),
    ownerId: req.user!.userId,
  });

  successResponse(res, 200, "Category deleted successfully", null);
});