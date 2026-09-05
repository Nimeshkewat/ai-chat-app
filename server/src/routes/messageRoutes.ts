import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";

const router = express();

router.post("/:chatId", authMiddleware, sendMessage);
router.get("/:chatId", authMiddleware, getMessages);

export default router;
