import express from "express";
import userRoutes from "../modules/user/user.route";
import cowRoutes from "../modules/cow/cow.route";
import orderRoutes from "../modules/order/order.route";
import { authRoutes } from "../modules/auth/auth.route";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/cows", cowRoutes);
router.use("/orders", orderRoutes);
router.use("/auth", authRoutes);

export default router;
