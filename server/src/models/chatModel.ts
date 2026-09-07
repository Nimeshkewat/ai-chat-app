import mongoose, { Document, Model } from "mongoose";

interface IChat extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
}

const chatSchema = new mongoose.Schema<IChat>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
  },
  { timestamps: true },
);

const Chat: Model<IChat> =
  mongoose.models.Chat || mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
