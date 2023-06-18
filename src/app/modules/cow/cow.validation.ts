import { z } from "zod";
import { breed, category, location } from "./cow.constant";

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    age: z
      .number({
        required_error: "age is required",
      })
      .positive(),
    price: z
      .number({
        required_error: "price is required",
      })
      .positive(),
    weight: z
      .number({
        required_error: "weight is required",
      })
      .positive(),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: "location is required",
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: "breed is required",
    }),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: "category is required",
    }),
    seller: z.string({
      required_error: "seller is required",
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().positive().optional(),
    price: z.number().positive().optional(),
    weight: z.number().positive().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    category: z.enum([...category] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
