import { ComponentsObject } from "openapi3-ts/oas31";

export const orderSchemas: ComponentsObject["schemas"] = {
  OrderStatus: {
    type: "string",
    enum: [
      "PENDING",
      "ACCEPTED",
      "PREPARING",
      "READY",
      "COMPLETED",
      "CANCELLED",
    ],
    example: "PENDING",
  },

  Order: {
    type: "object",
    required: [
      "id",
      "customerId",
      "restaurantId",
      "status",
      "totalAmount",
      "createdAt",
      "updatedAt",
    ],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },

      customerId: {
        type: "integer",
        example: 5,
      },

      restaurantId: {
        type: "integer",
        example: 3,
      },

      status: {
        $ref: "#/components/schemas/OrderStatus",
      },

      totalAmount: {
        type: "number",
        format: "float",
        example: 11000,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  OrderItem: {
    type: "object",
    required: [
      "id",
      "orderId",
      "menuItemId",
      "quantity",
      "unitPrice",
      "subtotal",
    ],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },

      orderId: {
        type: "integer",
        example: 1,
      },

      menuItemId: {
        type: "integer",
        example: 2,
      },

      quantity: {
        type: "integer",
        example: 2,
      },

      unitPrice: {
        type: "number",
        format: "float",
        example: 3500,
      },

      subtotal: {
        type: "number",
        format: "float",
        example: 7000,
      },
    },
  },

  OrderDetails: {
    allOf: [
      {
        $ref: "#/components/schemas/Order",
      },
      {
        type: "object",
        required: ["items"],
        properties: {
          items: {
            type: "array",
            items: {
              $ref: "#/components/schemas/OrderItem",
            },
          },
        },
      },
    ],
  },

  CreateOrderItemRequest: {
    type: "object",
    required: ["menuItemId", "quantity"],
    properties: {
      menuItemId: {
        type: "integer",
        minimum: 1,
        example: 2,
      },

      quantity: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        example: 2,
      },
    },
  },

  CreateOrderRequest: {
    type: "object",
    required: ["restaurantId", "items"],
    properties: {
      restaurantId: {
        type: "integer",
        minimum: 1,
        example: 3,
      },

      items: {
        type: "array",
        minItems: 1,
        items: {
          $ref: "#/components/schemas/CreateOrderItemRequest",
        },
      },
    },
  },

  UpdateOrderStatusRequest: {
    type: "object",
    required: ["status"],
    properties: {
      status: {
        type: "string",
        enum: ["ACCEPTED", "PREPARING", "READY", "COMPLETED"],
        example: "ACCEPTED",
      },
    },
  },
};
