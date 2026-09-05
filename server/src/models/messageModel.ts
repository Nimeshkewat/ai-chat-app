import mongoose, { Document, Model } from "mongoose";

interface IMessage extends Document {
  chat: mongoose.Types.ObjectId;
  role: "user" | "assistant";
  content: string;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
