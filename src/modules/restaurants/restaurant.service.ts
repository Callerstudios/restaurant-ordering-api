import { PaginationQuery } from "../../types/pagination.types";
import { ApiError } from "../../utils/api-error";
import { getPagination } from "../../utils/pagination";
import { restaurantRepository } from "./restaurant.repository";
import {
  CreateRestaurantDto,
  DeleteRestaurantRequest,
  Restaurant,
  UpdateRestaurantDto,
  UpdateRestaurantRequest,
} from "./restaurant.types";
import { restaurantAccessService } from "./restaurant-access.service";

async function create(data: CreateRestaurantDto) {
  const restaurantId = await restaurantRepository.create(data);

  const restaurant = await restaurantRepository.findById(restaurantId);

  if (!restaurant) {
    throw new ApiError(500, "Failed to create restaurant");
  }

  return restaurant;
}
async function findAll(query: PaginationQuery) {
  const { page, limit, offset } = getPagination(query);

  const restaurants = await restaurantRepository.findAll(page, limit, offset);

  const total = await restaurantRepository.count();

  return {
    restaurants,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
async function findById(id: number) {
  const restaurant = await restaurantRepository.findById(id);

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  return restaurant;
}
async function update({
  restaurantId,
  ownerId,
  data,
}: UpdateRestaurantRequest) {
  // const restaurant = await restaurantRepository.findById(restaurantId);

  await restaurantAccessService.requireOwnedRestaurant(restaurantId, ownerId);

  await restaurantRepository.update(restaurantId, data);

  return restaurantRepository.findById(restaurantId);
}
async function remove({
  restaurantId,
  ownerId,
}: DeleteRestaurantRequest): Promise<void> {
  // const restaurant = await restaurantRepository.findById(restaurantId);

  await restaurantAccessService.requireOwnedRestaurant(restaurantId, ownerId);

  await restaurantRepository.delete(restaurantId);
}
export const restaurantService = {
  create,
  findAll,
  findById,
  update,
  delete: remove,
};
