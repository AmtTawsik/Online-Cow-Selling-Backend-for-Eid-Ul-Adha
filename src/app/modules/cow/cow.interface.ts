import { Document, Types } from "mongoose";

export interface Cow {
  name: string;
  age: number;
  price: number;
  location: string;
  breed: string;
  weight: number;
  label: string;
  category: string;
  seller: Types.ObjectId;
}

export type CowModel = Cow & Document;
