import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "bson";

const createOrderSchema = z.object({
  cow: z
    .string()
    .refine((value) => value.trim().length > 0, {
      message: "Cow is required",
    })
    .refine((value) => ObjectId.isValid(value), {
      message: "Invalid ObjectId for cow",
    }),
  buyer: z
    .string()
    .refine((value) => value.trim().length > 0, {
      message: "Buyer is required",
    })
    .refine((value) => ObjectId.isValid(value), {
      message: "Invalid ObjectId for buyer",
    }),
});

export const createOrderValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createOrderSchema.parse(req.body);
    // next();
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
