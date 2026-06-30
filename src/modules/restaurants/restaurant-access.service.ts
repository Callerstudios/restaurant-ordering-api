import { ApiError } from "../../utils/api-error";
import { restaurantRepository } from "./restaurant.repository";
import { Restaurant } from "./restaurant.types";

async function requireRestaurant(restaurantId: number): Promise<Restaurant> {
  const restaurant = await restaurantRepository.findById(restaurantId);

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  return restaurant;
}

async function requireOwnedRestaurant(
  restaurantId: number,
  ownerId: number,
): Promise<Restaurant> {
  const restaurant = await requireRestaurant(restaurantId);

  if (restaurant.owner_id !== ownerId) {
    throw new ApiError(
      403,
      "You do not have permission to access this restaurant",
    );
  }

  return restaurant;
}

export const restaurantAccessService = {
  requireRestaurant,
  requireOwnedRestaurant,
};
