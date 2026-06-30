import { PathsObject } from "openapi3-ts/oas31";
import { successResponseSchema } from "../../builders";

export const restaurantPaths: PathsObject = {
  "/restaurants": {
    get: {
      tags: ["Restaurants"],
      summary: "Get all restaurants",
      description: "Retrieves a paginated list of restaurants.",

      parameters: [
        {
          $ref: "#/components/parameters/Page",
        },
        {
          $ref: "#/components/parameters/Limit",
        },
      ],

      responses: {
        "200": {
          description: "Restaurants retrieved successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/RestaurantList",
                },
                "Restaurants retrieved successfully",
              ),
            },
          },
        },

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },

    post: {
      tags: ["Restaurants"],
      summary: "Create a restaurant",
      description: "Creates a new restaurant owned by the authenticated owner.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateRestaurantRequest",
            },
          },
        },
      },

      responses: {
        "201": {
          description: "Restaurant created successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/Restaurant",
                },
                "Restaurant created successfully",
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

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/restaurants/{id}": {
    get: {
      tags: ["Restaurants"],
      summary: "Get a restaurant",
      description: "Retrieves a restaurant by its ID.",

      parameters: [
        {
          $ref: "#/components/parameters/Id",
        },
      ],

      responses: {
        "200": {
          description: "Restaurant retrieved successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/Restaurant",
                },
                "Restaurant retrieved successfully",
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
      tags: ["Restaurants"],
      summary: "Update a restaurant",
      description: "Updates a restaurant owned by the authenticated owner.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          $ref: "#/components/parameters/Id",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateRestaurantRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Restaurant updated successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  $ref: "#/components/schemas/Restaurant",
                },
                "Restaurant updated successfully",
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

    delete: {
      tags: ["Restaurants"],
      summary: "Delete a restaurant",
      description: "Deletes a restaurant owned by the authenticated owner.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          $ref: "#/components/parameters/Id",
        },
      ],

      responses: {
        "200": {
          description: "Restaurant deleted successfully",
          content: {
            "application/json": {
              schema: successResponseSchema(
                {
                  type: "null",
                },
                "Restaurant deleted successfully",
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
