import { GenericErrorMessageType } from "./error";

/**
 * Represents a generic error response type.
 */
export type GenericErrorResponseType = {
  statusCode: number; // The HTTP status code associated with the error response.
  message: string; // The error message describing the nature of the error.
  errorMessages: GenericErrorMessageType[]; // An array of error messages providing additional details about the errors encountered.
};

// Defines the type for pagination options
/**
 * PaginationOptionType is a type that represents the options for pagination.
 * It includes the page number, limit (number of items per page), sortBy (field to sort by), and sortOrder (sorting order).
 */
export type PaginationOptionType = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ascending" | "asc" | "descending" | "desc";
};

// Defines the type for the generic response structure
/**
 * GenericResponseType is a type that represents the generic structure of a response.
 * It includes the meta object with pagination information (page, limit, total) and the data object with the actual data.
 */
export type GenericResponseType<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
