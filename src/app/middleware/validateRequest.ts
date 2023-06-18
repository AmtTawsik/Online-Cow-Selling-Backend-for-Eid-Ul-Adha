import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodEffects } from "zod";

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Middleware function/handler

    try {
      // Validate the request data against the provided schema
      await schema.parseAsync({
        body: req.body, // Passing for validations if body & body's schema exists
        query: req.query, // Passing for validations if query & query's schema exists
        params: req.params, // Passing for validations if params & params's schema exists
        cookies: req.cookies, // Passing for validations if cookies & cookies's schema exists
      });

      // If validation succeeds, proceed to the next middleware or route handler
      // return next();
    } catch (error) {
      // If validation fails, pass the error to the error handling middleware
      return next(error);
    }
  };

export default validateRequest;
