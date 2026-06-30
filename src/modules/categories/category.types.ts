export interface Category {
  id: number;
  restaurant_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCategoryDto {
  restaurantId: number;
  ownerId: number;
  name: string;
}

export interface UpdateCategoryDto {
  name?: string;
}

export interface UpdateCategoryRequest {
  restaurantId: number;
  categoryId: number;
  ownerId: number;
  data: UpdateCategoryDto;
}

export interface DeleteCategoryRequest {
  restaurantId: number;
  categoryId: number;
  ownerId: number;
}
export interface DeleteCategoryRequest {
  restaurantId: number;
  categoryId: number;
  ownerId: number;
}