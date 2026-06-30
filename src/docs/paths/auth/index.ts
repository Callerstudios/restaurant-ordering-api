import { PathsObject } from "openapi3-ts/oas31";

export const authPaths: PathsObject = {
  "/auth/register": {
    post: {
      tags: ["Authentication"],
      summary: "Register a new user",
      description: "Creates a new user account.",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterRequest",
            },
          },
        },
      },

      responses: {
        "201": {
          description: "User registered successfully",
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
                    example: "User registered successfully",
                  },

                  data: {
                    $ref: "#/components/schemas/RegisterResponse",
                  },

                  meta: {
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

        "400": {
          $ref: "#/components/responses/BadRequest",
        },

        "409": {
          $ref: "#/components/responses/Conflict",
        },

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "Login",

      description: "Authenticates a user and returns a JWT token.",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Login successful",
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
                    example: "Login successful",
                  },

                  data: {
                    $ref: "#/components/schemas/TokenResponse",
                  },

                  meta: {
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

        "400": {
          $ref: "#/components/responses/BadRequest",
        },

        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
      },
    },
  },

  "/auth/me": {
    get: {
      tags: ["Authentication"],
      summary: "Get authenticated user",

      description: "Returns the currently authenticated user.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        "200": {
          description: "User data retrieved successfully",
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
                    example: "User data retrieved successfully",
                  },

                  data: {
                    $ref: "#/components/schemas/User",
                  },

                  meta: {
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

        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
      },
    },
  },
};
