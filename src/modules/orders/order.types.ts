import { OrderStatus } from "./order.constants";

export interface Order {
  id: number;
  customerId: number;
  restaurantId: number;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
export interface CreateOrderRequest {
  customerId: number;
  restaurantId: number;
  items: CreateOrderItemRequest[];
}
export interface CreateOrderItemRequest {
  menuItemId: number;
  quantity: number;
}
export interface CreateOrderItemRecord {
  menuItemId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
export interface CreateOrderData {
  customerId: number;
  restaurantId: number;
  status: OrderStatus;
  totalAmount: number;
}

export interface CreateOrderItemData {
  menuItemId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
export interface OrderDetails extends Order {
  items: OrderItem[];
}
export interface GetOrderRequest {
  orderId: number;
  customerId: number;
}
export interface GetOrdersRequest {
  customerId: number;
  page: number;
  limit: number;
  status?: OrderStatus;
  sortBy?: "createdAt" | "totalAmount";
  sortOrder?: "asc" | "desc";
}
export interface PaginatedOrders {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface PaginationOptions {
  page: number;
  limit: number;
}
export interface GetOrdersRequest extends PaginationOptions {
  customerId: number;
  status?: OrderStatus;
  sortBy?: "createdAt" | "totalAmount";
  sortOrder?: "asc" | "desc";
}
export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface GetRestaurantOrdersRequest {
  ownerId: number;
  restaurantId: number;
  page: number;
  limit: number;
  status?: OrderStatus;
  sortBy?: "createdAt" | "totalAmount";
  sortOrder?: "asc" | "desc";
}
export interface UpdateOrderStatusRequest {
  ownerId: number;
  orderId: number;
  status: OrderStatus;
}
export interface CancelOrderRequest {
  customerId: number;
  orderId: number;
}