export interface MenuItem {
  id: number;
  categoryId: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMenuItemDto {
  restaurantId: number;
  categoryId: number;
  ownerId: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export interface UpdateMenuItemDto {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string | null;
  isAvailable?: boolean;
}
export interface DeleteMenuItemRequest {
  restaurantId: number;
  categoryId: number;
  menuItemId: number;
  ownerId: number;
}
export interface OrderableMenuItem {
  id: number;
  categoryId: number;
  restaurantId: number;
  name: string;
  price: number;
  isAvailable: boolean;
}