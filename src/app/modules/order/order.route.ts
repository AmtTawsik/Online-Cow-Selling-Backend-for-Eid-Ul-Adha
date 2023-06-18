import express from "express";
import { createOrderHandler, getOrdersHandler } from "./order.controller";

const orderRoutes = express.Router();

orderRoutes.post("/", createOrderHandler);
orderRoutes.get("/", getOrdersHandler);

export default orderRoutes;
