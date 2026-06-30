import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({
      message: "Missing token",
    });

  const token = header.split(" ")[1];

  try {
    req.user = verifyToken(token);

    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}
