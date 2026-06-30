import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { registerSchema } from "../validators/auth.validator";
import { errorResponse } from "../utils/api-response";

// const requestSchema = z.object({
//   body: z.any(),
//   params: z.any(),
//   query: z.any(),
// });

type RequestSchema = z.infer<typeof registerSchema>;

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    if (!result.success) {
      return errorResponse(
        res,
        400,
        "Validation failed",
        result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      );
    }
    const data = result.data as RequestSchema;
    req.body = data.body;
    next();
  };
}
