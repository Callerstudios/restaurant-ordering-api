import { PathsObject } from "openapi3-ts/oas31";
import { successResponseSchema } from "../../builders";

export const menuItemPaths: PathsObject = {
  "/restaurants/{restaurantId}/categories/{categoryId}/menu-items": {
    get: {
      tags: ["Menu Items"],
      summary: "Get menu items",
      description: "Retrieves all menu items in a category.",

      parameters: [
        {
          $ref: "#/components/parameters/RestaurantId",
        },
        {
          $ref: "#/components/parameters/CategoryId",
        },
      ],

      responses: {
        "200": {
          description: "Menu items retrieved successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/MenuItem",
                  },
                },
                "Menu items retrieved successfully",
              ),
            },
          },
        },

        "404": {
          $ref: "#/components/responses/NotFound",
        },
      },
    },

    post: {
      tags: ["Menu Items"],
      summary: "Create menu item",
      description:
        "Creates a new menu item in a category owned by the authenticated owner.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          $ref: "#/components/parameters/RestaurantId",
        },
        {
          $ref: "#/components/parameters/CategoryId",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateMenuItemRequest",
            },
          },
        },
      },

      responses: {
        "201": {
          description: "Menu item created successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/MenuItem",
                },
                "Menu item created successfully",
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

        "409": {
          $ref: "#/components/responses/Conflict",
        },
      },
    },
  },

  "/restaurants/{restaurantId}/categories/{categoryId}/menu-items/{menuItemId}":
    {
      get: {
        tags: ["Menu Items"],
        summary: "Get menu item",
        description: "Retrieves a menu item by its ID.",

        parameters: [
          {
            $ref: "#/components/parameters/RestaurantId",
          },
          {
            $ref: "#/components/parameters/CategoryId",
          },
          {
            $ref: "#/components/parameters/MenuItemId",
          },
        ],

        responses: {
          "200": {
            description: "Menu item retrieved successfully",
            content: {
              "application/json": {
                schema: successResponseSchema(
                  {
                    $ref: "#/components/schemas/MenuItem",
                  },
                  "Menu item retrieved successfully",
                ),
              },
            },
          },

          "404": {
            $ref: "#/components/responses/NotFound",
          },
        },
      },

      patch: {
        tags: ["Menu Items"],
        summary: "Update menu item",
        description: "Updates a menu item owned by the authenticated owner.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            $ref: "#/components/parameters/RestaurantId",
          },
          {
            $ref: "#/components/parameters/CategoryId",
          },
          {
            $ref: "#/components/parameters/MenuItemId",
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateMenuItemRequest",
              },
            },
          },
        },

        responses: {
          "200": {
            description: "Menu item updated successfully",
            content: {
              "application/json": {
                schema: successResponseSchema(
                  {
                    $ref: "#/components/schemas/MenuItem",
                  },
                  "Menu item updated successfully",
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

          "409": {
            $ref: "#/components/responses/Conflict",
          },
        },
      },

      delete: {
        tags: ["Menu Items"],
        summary: "Delete menu item",
        description: "Deletes a menu item owned by the authenticated owner.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            $ref: "#/components/parameters/RestaurantId",
          },
          {
            $ref: "#/components/parameters/CategoryId",
          },
          {
            $ref: "#/components/parameters/MenuItemId",
          },
        ],

        responses: {
          "200": {
            description: "Menu item deleted successfully",
            content: {
              "application/json": {
                schema: successResponseSchema(
                  {
                    type: "null",
                  },
                  "Menu item deleted successfully",
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
