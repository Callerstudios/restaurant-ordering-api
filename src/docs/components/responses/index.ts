import { ComponentsObject } from "openapi3-ts/oas31";

export const responses: ComponentsObject["responses"] = {
  BadRequest: {
    description: "Bad Request",
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["success", "message", "data", "errors"],
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Validation failed",
            },
            data: {
              type: "null",
            },
            errors: {
              type: "object",
              example: {
                body: {
                  email: ["Invalid email address"],
                },
              },
            },
          },
        },
      },
    },
  },

  Unauthorized: {
    description: "Authentication required",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
      },
    },
  },

  Forbidden: {
    description: "Forbidden",
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["success", "message", "data", "errors"],
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "You do not have permission to perform this action",
            },
            data: {
              type: "null",
            },
            errors: {
              type: "null",
            },
          },
        },
      },
    },
  },

  NotFound: {
    description: "Resource not found",
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["success", "message", "data", "errors"],
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Resource not found",
            },
            data: {
              type: "null",
            },
            errors: {
              type: "null",
            },
          },
        },
      },
    },
  },

  Conflict: {
    description: "Conflict",
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["success", "message", "data", "errors"],
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Resource already exists",
            },
            data: {
              type: "null",
            },
            errors: {
              type: "null",
            },
          },
        },
      },
    },
  },

  InternalServerError: {
    description: "Internal server error",
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["success", "message", "data", "errors"],
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Internal server error",
            },
            data: {
              type: "null",
            },
            errors: {
              type: "null",
            },
          },
        },
      },
    },
  },
};
