import { Document, Types } from "mongoose";

interface Order extends Document {
  cow: string;
  buyer: string;
}

export default Order;
