import { Request, Response } from "express";
import { AuthService } from "./auth.services";

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await AuthService.registerUser(email, password);
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await AuthService.loginUser(email, password);
    res.json({ success: true, token });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
}
