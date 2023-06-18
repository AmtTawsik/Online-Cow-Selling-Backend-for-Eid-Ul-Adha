import express from "express";
import {
  createUserControl,
  deleteUserControl,
  getUserByIdControl,
  getUsersControl,
  updateUserControl,
} from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";

const userRouter = express.Router();

userRouter.post("/", createUserControl);
userRouter.get("/", getUsersControl);
userRouter.get("/:id", getUserByIdControl);
userRouter.put(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  updateUserControl
);
userRouter.delete("/:id", deleteUserControl);

export default userRouter;
