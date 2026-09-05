import express from "express";
import {
  checkAuth,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/userValidator.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

router.get("/profile", authMiddleware, getProfile);
router.get("/check-auth", authMiddleware, checkAuth);

export default router;
