import { UserModel } from "./user.model";
import { User } from "./user.interface";

export async function createUser(
  name: {
    firstName: string;
    lastName: string;
  },
  password: string,
  role: string,
  phoneNumber: string,
  address: string
): Promise<User> {
  const newUser = await UserModel.create({
    name,
    password,
    role,
    phoneNumber,
    address,
  });
  return newUser;
}

export async function getUsers(): Promise<User[]> {
  const users = await UserModel.find();
  return users;
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await UserModel.findById(id);
  return user;
}

export async function updateUser(
  id: string,
  userData: Partial<User>
): Promise<User | null> {
  const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
    new: true,
  });
  return updatedUser;
}

export async function deleteUser(id: string): Promise<User | null> {
  const deletedUser = await UserModel.findByIdAndDelete(id);
  return deletedUser;
}
