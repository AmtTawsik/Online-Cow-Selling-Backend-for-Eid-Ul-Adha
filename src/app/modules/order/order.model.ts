import { Schema, model } from "mongoose";
import Order from "./order.interface";

const orderSchema = new Schema<Order>(
  {
    cow: { type: String, required: true },
    buyer: { type: String, required: true },
  },
  { timestamps: true }
);

const OrderModel = model<Order>("Order", orderSchema);

export default OrderModel;
