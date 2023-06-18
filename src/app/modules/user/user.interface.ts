// import { Document } from "mongoose";

// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export default User;

import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  _id: string;
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: ["seller", "buyer"], required: true },
  password: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  address: { type: String, required: true },
  budget: { type: Number, required: true },
  income: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export default User;
