import { Request, Response } from "express";
import Chat from "../models/chatModel.js";

export const createChat = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { title } = req.body;

    const chat = await Chat.create({
      user: id,
      title: title || "New Chat",
    });

    res.status(201).json({ success: true, chat });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknow error occirred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const chats = await Chat.find({ user: id }).lean();
    if (chats.length === 0) {
      return res.status(404).json({ success: false, message: "No chat found" });
    }

    res.status(200).json({ success: true, chats });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknow error occirred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getChat = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { chatId } = req.params;

    const chat = await Chat.findOne({ user: id, _id: chatId }).lean();
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknow error occirred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const deleteChat = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { chatId } = req.params;

    const chat = await Chat.findOneAndDelete({ user: id, _id: chatId });
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknow error occirred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const updateChat = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { chatId } = req.params;
    const { title } = req.body;

    const chat = await Chat.findOneAndUpdate(
      { user: id, _id: chatId },
      { title },
      { returnDocument: "after" },
    );
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknow error occirred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};
