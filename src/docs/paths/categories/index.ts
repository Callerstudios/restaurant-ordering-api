import { PathsObject } from "openapi3-ts/oas31";
import { successResponseSchema } from "../../builders";

export const categoryPaths: PathsObject = {
  "/restaurants/{restaurantId}/categories": {
    get: {
      tags: ["Categories"],
      summary: "Get restaurant categories",
      description: "Retrieves all categories for a restaurant.",

      parameters: [
        {
          $ref: "#/components/parameters/RestaurantId",
        },
      ],

      responses: {
        "200": {
          description: "Categories retrieved successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Category",
                  },
                },
                "Categories retrieved successfully",
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
      tags: ["Categories"],
      summary: "Create category",
      description:
        "Creates a new category for a restaurant owned by the authenticated owner.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          $ref: "#/components/parameters/RestaurantId",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateCategoryRequest",
            },
          },
        },
      },

      responses: {
        "201": {
          description: "Category created successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/Category",
                },
                "Category created successfully",
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

  "/restaurants/{restaurantId}/categories/{categoryId}": {
    get: {
      tags: ["Categories"],
      summary: "Get category",
      description: "Retrieves a category by its ID.",

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
          description: "Category retrieved successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/Category",
                },
                "Category retrieved successfully",
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
      tags: ["Categories"],
      summary: "Update category",
      description: "Updates a category owned by the authenticated owner.",

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
              $ref: "#/components/schemas/UpdateCategoryRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Category updated successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/Category",
                },
                "Category updated successfully",
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
      tags: ["Categories"],
      summary: "Delete category",
      description: "Deletes a category owned by the authenticated owner.",

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

      responses: {
        "200": {
          description: "Category deleted successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  type: "null",
                },
                "Category deleted successfully",
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
