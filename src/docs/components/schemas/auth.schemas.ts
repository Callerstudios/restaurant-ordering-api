import { ComponentsObject } from "openapi3-ts/oas31";

export const authSchemas: ComponentsObject["schemas"] = {
  UserRole: {
    type: "string",
    enum: ["customer", "owner", "admin"],
    example: "customer",
  },

  User: {
    type: "object",
    required: ["id", "name", "email", "role", "created_at", "updated_at"],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      name: {
        type: "string",
        example: "John Doe",
      },
      email: {
        type: "string",
        format: "email",
        example: "john@example.com",
      },
      role: {
        $ref: "#/components/schemas/UserRole",
      },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2026-06-30T10:15:30.000Z",
      },
      updated_at: {
        type: "string",
        format: "date-time",
        example: "2026-06-30T10:15:30.000Z",
      },
    },
  },

  RegisterRequest: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
        minLength: 2,
        maxLength: 100,
        example: "John Doe",
      },
      email: {
        type: "string",
        format: "email",
        example: "john@example.com",
      },
      password: {
        type: "string",
        minLength: 8,
        example: "password123",
      },
      role: {
        $ref: "#/components/schemas/UserRole",
        default: "customer",
      },
    },
  },

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "john@example.com",
      },
      password: {
        type: "string",
        example: "password123",
      },
    },
  },

  TokenResponse: {
    type: "object",
    required: ["token"],
    properties: {
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxx.yyyyyyyyy",
      },
    },
  },
  RegisterResponse: {
    type: "object",
    required: ["token", "user"],
    properties: {
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxx.yyyyyyyyy",
      },
      user: {
        $ref: "#/components/schemas/User",
      },
    },
  },
};
