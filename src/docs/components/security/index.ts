import { ComponentsObject } from "openapi3-ts/oas31";

export const securitySchemes: ComponentsObject["securitySchemes"] = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
};
