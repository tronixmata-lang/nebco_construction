import mongoose, { Schema, type Model } from "mongoose";

export type AssistantChatMessageDocument = {
  role: "user" | "assistant";
  text: string;
  createdAt: Date;
};

export type AssistantChatDocument = {
  _id: mongoose.Types.ObjectId;
  sessionId: string;
  messages: AssistantChatMessageDocument[];
  pagePath?: string;
  userAgent?: string;
  lastPreview: string;
  messageCount: number;
  createdAt: Date;
  updatedAt: Date;
};

const AssistantChatMessageSchema = new Schema<AssistantChatMessageDocument>(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    text: { type: String, required: true, trim: true, maxlength: 4000 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const AssistantChatSchema = new Schema<AssistantChatDocument>(
  {
    sessionId: { type: String, required: true, unique: true, trim: true, index: true },
    messages: { type: [AssistantChatMessageSchema], default: [] },
    pagePath: { type: String, trim: true },
    userAgent: { type: String, trim: true, maxlength: 512 },
    lastPreview: { type: String, default: "", trim: true },
    messageCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

AssistantChatSchema.index({ updatedAt: -1 });

export const AssistantChat: Model<AssistantChatDocument> =
  mongoose.models.AssistantChat ??
  mongoose.model<AssistantChatDocument>("AssistantChat", AssistantChatSchema);
