import { ComponentsObject } from "openapi3-ts/oas31";

export const menuItemSchemas: ComponentsObject["schemas"] = {
  MenuItem: {
    type: "object",
    required: [
      "id",
      "categoryId",
      "name",
      "price",
      "isAvailable",
      "createdAt",
      "updatedAt",
    ],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },

      categoryId: {
        type: "integer",
        example: 5,
      },

      name: {
        type: "string",
        minLength: 2,
        maxLength: 150,
        example: "Jollof Rice",
      },

      description: {
        type: ["string", "null"],
        example: "Served with grilled chicken",
      },

      price: {
        type: "number",
        format: "float",
        example: 3500,
      },

      imageUrl: {
        type: ["string", "null"],
        format: "uri",
        example: "https://example.com/jollof.jpg",
      },

      isAvailable: {
        type: "boolean",
        example: true,
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

  CreateMenuItemRequest: {
    type: "object",
    required: ["name", "price"],
    properties: {
      name: {
        type: "string",
        minLength: 2,
        maxLength: 150,
        example: "Jollof Rice",
      },

      description: {
        type: "string",
        maxLength: 1000,
      },

      price: {
        type: "number",
        minimum: 0.01,
        example: 3500,
      },

      imageUrl: {
        type: "string",
        format: "uri",
        example: "https://example.com/jollof.jpg",
      },
    },
  },

  UpdateMenuItemRequest: {
    type: "object",
    minProperties: 1,
    properties: {
      name: {
        type: "string",
        minLength: 2,
        maxLength: 150,
      },

      description: {
        type: "string",
        maxLength: 1000,
      },

      price: {
        type: "number",
        minimum: 0.01,
      },

      imageUrl: {
        type: ["string", "null"],
        format: "uri",
      },

      isAvailable: {
        type: "boolean",
      },
    },
  },
};
