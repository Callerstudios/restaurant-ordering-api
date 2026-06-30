import { Request, Response } from "express";
import * as authService from "./auth.service";

import { asyncHandler } from "../../utils/async-handler";
import { successResponse } from "../../utils/api-response";


export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  successResponse(res, 201, "User registered successfully", result);
});
export const me = asyncHandler(async (req: Request, res: Response) => {
  successResponse(res, 200, "User data retrieved successfully", req.user);
});
export const login = asyncHandler(async (req, res) => {
  const token = await authService.login(req.body.email, req.body.password);

  successResponse(res, 200, "Login successful", token);
});