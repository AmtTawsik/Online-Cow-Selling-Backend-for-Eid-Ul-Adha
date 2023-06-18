import { Request } from "express";

export const getPaginationParams = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

export const getPaginationResponse = (
  totalItems: number,
  totalPages: number,
  currentPage: number,
  limit: number,
  data: any
) => {
  return {
    success: true,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      limit,
    },
    data,
  };
};
