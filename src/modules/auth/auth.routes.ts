import { Router } from "express";

import * as auth from "./auth.controller";

import { validate } from "../../middleware/validate";

import { loginSchema, registerSchema } from "../../validators/auth.validator";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), auth.register);
router.post("/login", validate(loginSchema), auth.login);
router.get("/me", authenticate, auth.me);

export default router;
