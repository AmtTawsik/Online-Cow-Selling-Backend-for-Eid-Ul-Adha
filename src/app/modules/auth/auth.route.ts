import express from "express";
import { register, login } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "../user/user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidation.createUserZodSchema),
  register
);
router.post("/login", login);

export const authRoutes = router;
