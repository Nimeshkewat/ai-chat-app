import express from "express";
import { login, logout, register } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/userValidator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

export default router;
