import { Response } from "express";

export function successResponse<T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
  meta?: unknown,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta: meta ?? null,
    errors: null,
  });
}

export function errorResponse(
  res: Response,
  statusCode: number,
  message: string,
  errors: unknown = null,
) {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    errors,
  });
}
