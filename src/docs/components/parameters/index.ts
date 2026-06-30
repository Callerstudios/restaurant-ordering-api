import { ComponentsObject } from "openapi3-ts/oas31";

export const parameters: ComponentsObject["parameters"] = {
  RestaurantId: {
    name: "restaurantId",
    in: "path",
    required: true,
    description: "Restaurant ID",
    schema: {
      type: "integer",
      minimum: 1,
    },
    example: 3,
  },

  CategoryId: {
    name: "categoryId",
    in: "path",
    required: true,
    description: "Category ID",
    schema: {
      type: "integer",
      minimum: 1,
    },
    example: 1,
  },

  MenuItemId: {
    name: "menuItemId",
    in: "path",
    required: true,
    description: "Menu item ID",
    schema: {
      type: "integer",
      minimum: 1,
    },
    example: 2,
  },

  OrderId: {
    name: "orderId",
    in: "path",
    required: true,
    description: "Order ID",
    schema: {
      type: "integer",
      minimum: 1,
    },
    example: 15,
  },

  Id: {
    name: "id",
    in: "path",
    required: true,
    description: "Resource ID",
    schema: {
      type: "integer",
      minimum: 1,
    },
    example: 1,
  },

  Page: {
    name: "page",
    in: "query",
    required: false,
    description: "Page number",
    schema: {
      type: "integer",
      minimum: 1,
      default: 1,
    },
  },

  Limit: {
    name: "limit",
    in: "query",
    required: false,
    description: "Number of records per page",
    schema: {
      type: "integer",
      minimum: 1,
      maximum: 100,
      default: 10,
    },
  },

  OrderStatus: {
    name: "status",
    in: "query",
    required: false,
    description: "Filter orders by status",
    schema: {
      $ref: "#/components/schemas/OrderStatus",
    },
  },

  SortBy: {
    name: "sortBy",
    in: "query",
    required: false,
    description: "Field to sort by",
    schema: {
      type: "string",
      enum: ["createdAt", "totalAmount"],
      default: "createdAt",
    },
  },

  SortOrder: {
    name: "sortOrder",
    in: "query",
    required: false,
    description: "Sort direction",
    schema: {
      type: "string",
      enum: ["asc", "desc"],
      default: "desc",
    },
  },
};
