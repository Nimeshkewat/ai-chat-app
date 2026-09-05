import { Request, Response } from "express";
import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";
import mongoose from "mongoose";
import { generateResponse } from "../services/geminiService.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { chatId } = req.params as { chatId: string };
    const { content } = req.body;

    const chat = await Chat.findOne({ user: id, _id: chatId });
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Save user's message
    const message = await Message.create({
      chat: new mongoose.Types.ObjectId(chatId),
      role: "user",
      content,
    });

    const messages = await Message.find({ chat: chatId })
      .sort({ createdAt: 1 })
      .lean();

    // Send message to Gemini
    const aiResponse = await generateResponse(messages);

    // Save Gemini's response
    const assistantMessage = await Message.create({
      chat: new mongoose.Types.ObjectId(chatId),
      role: "assistant",
      content: aiResponse,
    });

    res.status(201).json({
      success: true,
      messages: [message, assistantMessage],
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { chatId } = req.params;

    const chat = await Chat.findOne({ user: id, _id: chatId });
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const messages = await Message.find({ chat: chatId })
      .lean()
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknow error occirred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};
