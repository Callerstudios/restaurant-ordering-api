export interface Restaurant {
  id: number;
  owner_id: number;
  name: string;
  description: string | null;
  address: string;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateRestaurantDto {
  ownerId: number;
  name: string;
  description?: string;
  address: string;
  phone?: string;
}

export interface UpdateRestaurantDto {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
}
export interface UpdateRestaurantRequest {
  restaurantId: number;
  ownerId: number;
  data: UpdateRestaurantDto;
}
export interface DeleteRestaurantRequest {
  restaurantId: number;
  ownerId: number;
}