import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { errorResponse } from "../utils/api-response";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return errorResponse(res, err.statusCode, err.message);
  }

  console.error(err);

  return errorResponse(res, 500, "Internal Server Error");
}
