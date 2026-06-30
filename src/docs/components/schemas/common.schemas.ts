import { ComponentsObject } from "openapi3-ts/oas31";

export const commonSchemas: ComponentsObject["schemas"] = {
  PaginationMeta: {
    type: "object",
    required: ["page", "limit", "total", "totalPages"],
    properties: {
      page: {
        type: "integer",
        example: 1,
      },
      limit: {
        type: "integer",
        example: 10,
      },
      total: {
        type: "integer",
        example: 42,
      },
      totalPages: {
        type: "integer",
        example: 5,
      },
    },
  },
  ErrorResponse: {
    type: "object",
    required: ["success", "message", "data", "errors"],
    properties: {
      success: {
        type: "boolean",
        example: false,
      },
      message: {
        type: "string",
        example: "An error occurred",
      },
      data: {
        type: "null",
      },
      errors: {
        type: "null"
      },
    },
  },
};
