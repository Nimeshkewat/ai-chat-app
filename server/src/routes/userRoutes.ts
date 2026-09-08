import express from "express";
import {
  checkAuth,
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/userValidator.js";
import { authMiddleware } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

router.get("/profile", authMiddleware, getProfile);
router.patch(
  "/update",
  authMiddleware,
  upload.single("profilePhoto"),
  updateProfile,
);

router.get("/check-auth", authMiddleware, checkAuth);

export default router;
