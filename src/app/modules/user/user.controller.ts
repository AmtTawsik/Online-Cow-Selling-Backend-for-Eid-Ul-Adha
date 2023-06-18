import { Request, Response } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user.services";

export async function createUserControl(req: Request, res: Response) {
  const { name, password, role, phoneNumber, address } = req.body;
  const newUser = await createUser(name, password, role, phoneNumber, address);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User created successfully",
    data: newUser,
  });
}

export async function getUsersControl(_req: Request, res: Response) {
  const users = await getUsers();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    data: users,
  });
}

export async function getUserByIdControl(req: Request, res: Response) {
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
  } else {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User retrieved successfully",
      data: user,
    });
  }
}

export async function updateUserControl(req: Request, res: Response) {
  const { id } = req.params;
  const userData = req.body;
  const updatedUser = await updateUser(id, userData);
  if (!updatedUser) {
    res.status(404).json({ success: false, message: "User not found" });
  } else {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  }
}

export async function deleteUserControl(req: Request, res: Response) {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  if (!deletedUser) {
    res.status(404).json({ success: false, message: "User not found" });
  } else {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
      data: deletedUser,
    });
  }
}
