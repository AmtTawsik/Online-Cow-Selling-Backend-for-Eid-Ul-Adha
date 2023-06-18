import { Schema, Document, model, Types } from "mongoose";
import { CowModel } from "./cow.interface";

const cowSchema = new Schema<CowModel>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    breed: { type: String, required: true },
    weight: { type: Number, required: true },
    label: { type: String, required: true },
    category: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<CowModel & Document>("Cow", cowSchema);
