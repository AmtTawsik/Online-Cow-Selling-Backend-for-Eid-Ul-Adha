import CowModel from "./cow.model";
import { Cow, CowModel as CowModelType } from "./cow.interface";
import { Types } from "mongoose";

export class CowService {
  static async createCow(
    name: string,
    age: number,
    price: number,
    location: string,
    breed: string,
    weight: number,
    label: string,
    category: string,
    seller: Types.ObjectId
  ): Promise<CowModelType> {
    const existingCow = await CowModel.findOne({ name });
    if (existingCow) {
      throw new Error("already existing");
    }

    const cow: Cow = {
      name,
      age,
      price,
      location,
      breed,
      weight,
      label,
      category,
      seller,
    };
    return CowModel.create(cow);
  }

  // static async getCows({
  //   page,
  //   limit,
  //   sortBy,
  //   sortOrder,
  //   minPrice,
  //   maxPrice,
  //   location,
  //   searchTerm,
  // }: {
  //   page?: number;
  //   limit?: number;
  //   sortBy?: string;
  //   sortOrder?: string;
  //   minPrice?: number;
  //   maxPrice?: number;
  //   location?: string;
  //   searchTerm?: string;
  // }): Promise<{ cows: Cow[]; count: number }> {
  //   // Implement your logic to retrieve cows based on the provided filters and pagination options

  //   // Replace the following with your actual implementation
  //   const cows: Cow[] = []; // Array of cow objects
  //   const count: number = 0; // Total count of cows

  //   return { cows, count };
  // }

  static async getCows(queryParams: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    searchTerm?: string;
  }): Promise<{ cows: Cow[]; count: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      minPrice,
      maxPrice,
      location,
      searchTerm,
    } = queryParams;

    const sortField = sortOrder === "asc" ? sortBy : `-${sortBy}`;

    const query: any = {};

    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      query.price = { $lte: maxPrice };
    }

    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }

    if (searchTerm) {
      query.$or = [
        { location: { $regex: new RegExp(searchTerm, "i") } },
        { breed: { $regex: new RegExp(searchTerm, "i") } },
        { category: { $regex: new RegExp(searchTerm, "i") } },
      ];
    }

    try {
      const [cows, count] = await Promise.all([
        CowModel.find(query)
          .sort(sortField)
          .skip((page - 1) * limit)
          .limit(limit)
          .lean()
          .exec(),
        CowModel.countDocuments(query).exec(),
      ]);

      return { cows, count };
    } catch (error) {
      throw new Error("Failed to retrieve cows");
    }
  }

  static async getCowById(id: string): Promise<CowModelType | null> {
    return CowModel.findById(id);
  }

  static async updateCow(
    id: string,
    name: string,
    age: number,
    price: number,
    location: string,
    breed: string,
    weight: number,
    label: string,
    category: string,
    seller: string
  ): Promise<CowModelType | null> {
    return CowModel.findByIdAndUpdate(
      id,
      { name, age, price, location, breed, weight, label, category, seller },
      { new: true }
    );
  }

  static async deleteCow(id: string): Promise<CowModelType | null> {
    return CowModel.findByIdAndDelete(id);
  }
}
