import User from "../user/user.interface";
import { UserModel } from "../user/user.model";
import bcrypt from "bcrypt";

export class AuthService {
  static async registerUser(email: string, password: string): Promise<User> {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashedPassword });
    return user;
  }

  static async loginUser(email: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate and return an authentication token
    const token = "your-authentication-token";
    return token;
  }
}
