import { ComponentsObject } from "openapi3-ts/oas31";

export const categorySchemas: ComponentsObject["schemas"] = {
  Category: {
    type: "object",
    required: ["id", "restaurant_id", "name", "created_at", "updated_at"],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },

      restaurant_id: {
        type: "integer",
        example: 3,
      },

      name: {
        type: "string",
        minLength: 2,
        maxLength: 100,
        example: "Main Course",
      },

      created_at: {
        type: "string",
        format: "date-time",
        example: "2026-06-30T15:20:10.000Z",
      },

      updated_at: {
        type: "string",
        format: "date-time",
        example: "2026-06-30T15:20:10.000Z",
      },
    },
  },

  CreateCategoryRequest: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        minLength: 2,
        maxLength: 100,
        example: "Main Course",
      },
    },
  },

  UpdateCategoryRequest: {
    type: "object",
    minProperties: 1,
    properties: {
      name: {
        type: "string",
        minLength: 2,
        maxLength: 100,
        example: "Desserts",
      },
    },
  },
};
