import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createChat,
  deleteChat,
  getChat,
  getChats,
  updateChat,
} from "../controllers/chatController.js";

const router = express();

router.post("/", authMiddleware, createChat);
router.get("/:chatId", authMiddleware, getChat);
router.get("/", authMiddleware, getChats);
router.delete("/:chatId", authMiddleware, deleteChat);
router.patch("/:chatId", authMiddleware, updateChat);

export default router;
