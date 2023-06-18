import OrderModel from "./order.model";
import CowModel from "../cow/cow.model";
import { UserModel } from "../user/user.model";
import Order from "./order.interface";

export async function createOrder(
  cowId: string,
  buyerId: string
): Promise<Order> {
  // Check if the cow exists and is for sale
  const cow = await CowModel.findOne({ _id: cowId, status: "for sale" });
  if (!cow) {
    throw new Error("The requested cow is not available for sale.");
  }

  // Check if the buyer has enough budget
  const buyer = await UserModel.findById(buyerId);
  if (!buyer) {
    throw new Error("Buyer not found.");
  }
  if (buyer.budget < cow.price) {
    throw new Error("Insufficient budget to purchase the cow.");
  }

  // Start a transaction
  const session = await OrderModel.startSession();
  session.startTransaction();

  try {
    // Update cow's status to sold
    await CowModel.findByIdAndUpdate(cowId, { status: "sold" }, { session });

    // Deduct cow's price from buyer's budget
    await UserModel.findByIdAndUpdate(
      buyerId,
      { $inc: { budget: -cow.price } },
      { session }
    );

    // Add cow's price to seller's income
    await UserModel.findByIdAndUpdate(
      cow.seller,
      { $inc: { income: cow.price } },
      { session }
    );

    // Create the order
    const order = await OrderModel.create([{ cow: cowId, buyer: buyerId }], {
      session,
    });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    // Abort the transaction if any error occurs
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
// Done
export async function getOrders(): Promise<Order[]> {
  const orders = await OrderModel.find().populate("cow").populate("buyer");
  return orders;
}
