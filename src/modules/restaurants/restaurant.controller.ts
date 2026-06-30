import { asyncHandler } from "../../utils/async-handler";
import { successResponse } from "../../utils/api-response";
import { restaurantService } from "./restaurant.service";

export const createRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await restaurantService.create({
    ownerId: req.user!.userId,
    ...req.body,
  });

  successResponse(res, 201, "Restaurant created successfully", restaurant);
});
export const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await restaurantService.findAll(req.query as any);

  successResponse(res, 200, "Restaurants retrieved successfully", restaurants);
});
export const getRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await restaurantService.findById(Number(req.params.id));

  successResponse(res, 200, "Restaurant retrieved successfully", restaurant);
});
export const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await restaurantService.update({
    restaurantId: Number(req.params.id),
    ownerId: req.user!.userId,
    data: req.body,
  });

  successResponse(res, 200, "Restaurant updated successfully", restaurant);
});
export const deleteRestaurant = asyncHandler(async (req, res) => {
  await restaurantService.delete({
    restaurantId: Number(req.params.id),
    ownerId: req.user!.userId,
  });

  successResponse(res, 200, "Restaurant deleted successfully", null);
});