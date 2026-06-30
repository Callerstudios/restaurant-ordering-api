import { ReferenceObject, SchemaObject } from "openapi3-ts/oas31";

type Schema = SchemaObject | ReferenceObject;

export function successResponseSchema(
  data: Schema,
  message: string,
): SchemaObject {
  return {
    type: "object",
    required: ["success", "message", "data", "meta", "errors"],
    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      message: {
        type: "string",
        example: message,
      },

      data,

      meta: {
        type: "null",
      },

      errors: {
        type: "null",
      },
    },
  };
}
