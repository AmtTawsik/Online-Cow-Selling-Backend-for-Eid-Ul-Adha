import config from "../../config";
import ApiError from "../../errors/ApiError";
import { ErrorRequestHandler } from "express";
import { GenericErrorMessageType } from "../../interface/error";
import handleValidationError from "../../errors/handleValidationError";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import httpStatus from "http-status";
import handleCastError from "../../errors/handleCastError";

const globalErrorHandler: ErrorRequestHandler = (
  error, // <= All the error comes through  this error
  req, // Express request object
  res, // Express response object
  next // Express next function
) => {
  /**
   A generic error response must holds initial status code, error message and error messages by default. 
   This portions will be changed based on the error type dynamically
   */
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = "Something went wrong!" as string;
  let errorMessages: GenericErrorMessageType[] = [];
  // ..................
  let simplifiedError;

  // When mongoose schema validation error caught
  switch (true) {
    case error?.name === "ValidationError":
      /**
       * "handleValidation" helps to reshape the mongoose's error into a generic error response format.
       * Because errors can have different formats in different technologies.
       * It returns the status code, message, and error messages in a standardized format.
       */
      simplifiedError = handleValidationError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorMessages = simplifiedError?.errorMessages;
      // ...
      break;

    case error?.name === "CastError":
      /**
       * "handleCastError" helps to reshape the mongoose's error into a generic error response format.
       * Because errors can have different formats in different technologies.
       * It returns the status code, message, and error messages in a standardized format.
       */
      simplifiedError = handleCastError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorMessages = simplifiedError?.errorMessages;
      // ...
      break;

    case error instanceof ZodError:
      /**
       * "handleZodError" helps to reshape the Zod error into a generic error response format.
       * Because errors can have different formats in different technologies.
       * It returns the status code, message, and error messages.
       */
      simplifiedError = handleZodError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorMessages = simplifiedError?.errorMessages;
      // ...
      break;

    case error instanceof ApiError:
      /**
       * When an error occurs from any API service, services may send errors through a custom-made "ApiError".
       * Here, we reshape the error to show it as a generic response.
       */
      statusCode = error?.statusCode;
      message = error?.message;
      errorMessages = error?.message
        ? [
            {
              path: "",
              message: error?.message,
            },
          ]
        : [];
      // ...
      break;

    case error instanceof Error:
      /**
       * When an error is thrown from the built-in Error constructor,
       * we catch the error and reshape it to show as a generic response.
       */
      message = error?.message;
      errorMessages = error?.message
        ? [
            {
              path: "",
              message: error?.message,
            },
          ]
        : [];
      // ...
      break;
  }

  // Generic Error Response
  // next();
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config?.env !== "production" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
