import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "first name is required",
      }),
      lastName: z.string({
        required_error: "last name is required",
      }),
    }),
    role: z.string({
      required_error: "role is required",
    }),
    password: z.string({
      required_error: "password is required",
    }),
    phoneNumber: z.string({
      required_error: "phone number is required",
    }),
    address: z.string({
      required_error: "address is required",
    }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    role: z.string().optional(),
    password: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

// Export the validation schema as part of the UserValidation object
export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
