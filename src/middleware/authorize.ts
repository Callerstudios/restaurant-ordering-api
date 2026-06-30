import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/api-response";

export function authorizeRoles(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse(res, 401, "Unauthorized");
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 403, "Forbidden");
    }

    next();
  };
}
