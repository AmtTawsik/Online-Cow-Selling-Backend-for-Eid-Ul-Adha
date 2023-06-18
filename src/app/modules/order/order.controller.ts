import { Request, Response } from "express";
import { createOrder, getOrders } from "./order.services";

export async function createOrderHandler(req: Request, res: Response) {
  try {
    const { cow, buyer } = req.body;
    const order = await createOrder(cow, buyer);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Order created successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to create order",
      error: error.message,
    });
  }
}

export async function getOrdersHandler(req: Request, res: Response) {
  try {
    const orders = await getOrders();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to retrieve orders",
      error: error.message,
    });
  }
}
