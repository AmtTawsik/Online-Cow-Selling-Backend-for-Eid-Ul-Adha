import { Request, Response } from "express";
import { CowService } from "./cow.services";

export const createCow = async (req: Request, res: Response) => {
  const { name, age, price, location, breed, weight, label, category, seller } =
    req.body;

  const cow = await CowService.createCow(
    name,
    age,
    price,
    location,
    breed,
    weight,
    label,
    category,
    seller
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cow created successfully",
    data: cow,
  });
};

export const getCowById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cow = await CowService.getCowById(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cow retrieved successfully",
    data: cow,
  });
};

export const updateCow = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, price, location, breed, weight, label, category, seller } =
    req.body;

  const cow = await CowService.updateCow(
    id,
    name,
    age,
    price,
    location,
    breed,
    weight,
    label,
    category,
    seller
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cow updated successfully",
    data: cow,
  });
};

export const deleteCow = async (req: Request, res: Response) => {
  const { id } = req.params;

  await CowService.deleteCow(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cow deleted successfully",
    data: {},
  });
};

export const getCows = async (_req: Request, res: Response) => {
  const { cows, count } = await CowService.getCows({});
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cows retrieved successfully",
    meta: {
      count,
    },
    data: cows,
  });
};

export const getCowsWithFilters = async (req: Request, res: Response) => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    location,
    searchTerm,
  } = req.query;

  const cowsFilters = {
    page: parseInt(page as string) || undefined,
    limit: parseInt(limit as string) || undefined,
    sortBy: sortBy as string,
    sortOrder: sortOrder as string,
    minPrice: parseInt(minPrice as string) || undefined,
    maxPrice: parseInt(maxPrice as string) || undefined,
    location: location as string,
    searchTerm: searchTerm as string,
  };

  const { cows, count } = await CowService.getCows(cowsFilters);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cows retrieved successfully",
    meta: {
      count,
      page: 1,
      limit: cowsFilters.limit,
    },
    data: cows,
  });
};
