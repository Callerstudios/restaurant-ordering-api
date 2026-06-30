import { PathsObject } from "openapi3-ts/oas31";
import { successResponseSchema } from "../../builders";

export const orderPaths: PathsObject = {
  "/orders": {
    post: {
      tags: ["Orders"],
      summary: "Create order",
      description: "Creates a new order for the authenticated customer.",

      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateOrderRequest",
            },
          },
        },
      },

      responses: {
        "201": {
          description: "Order created successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/OrderDetails",
                },
                "Order created successfully",
              ),
            },
          },
        },

        "400": {
          $ref: "#/components/responses/BadRequest",
        },

        "401": {
          $ref: "#/components/responses/Unauthorized",
        },

        "403": {
          $ref: "#/components/responses/Forbidden",
        },

        "404": {
          $ref: "#/components/responses/NotFound",
        },
      },
    },

    get: {
      tags: ["Orders"],
      summary: "Get customer orders",
      description: "Retrieves the authenticated customer's orders.",

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          $ref: "#/components/parameters/Page",
        },
        {
          $ref: "#/components/parameters/Limit",
        },
        {
          $ref: "#/components/parameters/OrderStatus",
        },
        {
          $ref: "#/components/parameters/SortBy",
        },
        {
          $ref: "#/components/parameters/SortOrder",
        },
      ],

      responses: {
        "200": {
          description: "Orders retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["success", "message", "data", "meta", "errors"],
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },

                  message: {
                    type: "string",
                    example: "Orders retrieved successfully",
                  },

                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Order",
                    },
                  },

                  meta: {
                    $ref: "#/components/schemas/PaginationMeta",
                  },

                  errors: {
                    type: "null",
                  },
                },
              },
            },
          },
        },

        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
      },
    },
  },

  "/orders/{orderId}": {
    get: {
      tags: ["Orders"],
      summary: "Get order",
      description: "Retrieves a specific order.",

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          $ref: "#/components/parameters/OrderId",
        },
      ],

      responses: {
        "200": {
          description: "Order retrieved successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/OrderDetails",
                },
                "Order retrieved successfully",
              ),
            },
          },
        },

        "401": {
          $ref: "#/components/responses/Unauthorized",
        },

        "404": {
          $ref: "#/components/responses/NotFound",
        },
      },
    },
  },

  "/orders/{restaurantId}/orders": {
    get: {
      tags: ["Orders"],
      summary: "Get restaurant orders",
      description:
        "Retrieves orders for a restaurant owned by the authenticated owner.",

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          $ref: "#/components/parameters/RestaurantId",
        },
        {
          $ref: "#/components/parameters/Page",
        },
        {
          $ref: "#/components/parameters/Limit",
        },
        {
          $ref: "#/components/parameters/OrderStatus",
        },
        {
          $ref: "#/components/parameters/SortBy",
        },
        {
          $ref: "#/components/parameters/SortOrder",
        },
      ],

      responses: {
        "200": {
          description: "Restaurant orders retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["success", "message", "data", "meta", "errors"],
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },

                  message: {
                    type: "string",
                    example: "Restaurant orders retrieved successfully",
                  },

                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Order",
                    },
                  },

                  meta: {
                    $ref: "#/components/schemas/PaginationMeta",
                  },

                  errors: {
                    type: "null",
                  },
                },
              },
            },
          },
        },

        "401": {
          $ref: "#/components/responses/Unauthorized",
        },

        "403": {
          $ref: "#/components/responses/Forbidden",
        },
      },
    },
  },

  "/orders/orders/{orderId}/status": {
    patch: {
      tags: ["Orders"],
      summary: "Update order status",
      description: "Updates the status of an order.",

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          $ref: "#/components/parameters/OrderId",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateOrderStatusRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Order status updated successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/OrderDetails",
                },
                "Order status updated successfully",
              ),
            },
          },
        },

        "400": {
          $ref: "#/components/responses/BadRequest",
        },

        "401": {
          $ref: "#/components/responses/Unauthorized",
        },

        "403": {
          $ref: "#/components/responses/Forbidden",
        },

        "404": {
          $ref: "#/components/responses/NotFound",
        },
      },
    },
  },

  "/orders/{orderId}/cancel": {
    patch: {
      tags: ["Orders"],
      summary: "Cancel order",
      description: "Cancels an order belonging to the authenticated customer.",

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          $ref: "#/components/parameters/OrderId",
        },
      ],

      responses: {
        "200": {
          description: "Order cancelled successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/OrderDetails",
                },
                "Order cancelled successfully",
              ),
            },
          },
        },

        "401": {
          $ref: "#/components/responses/Unauthorized",
        },

        "403": {
          $ref: "#/components/responses/Forbidden",
        },

        "404": {
          $ref: "#/components/responses/NotFound",
        },
      },
    },
  },
};
