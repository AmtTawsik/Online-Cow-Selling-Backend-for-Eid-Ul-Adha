import { Schema, model } from "mongoose";
import User from "./user.interface";

const userSchema = new Schema<User>({
  name: { type: Object, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  budget: { type: Number, required: true },
  income: { type: Number, required: true },
  role: { type: String, enum: ["seller", "buyer"], default: "buyer" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = model<User>("User", userSchema);
