import express from "express";
import {
  createCow,
  getCows,
  getCowById,
  updateCow,
  deleteCow,
  getCowsWithFilters,
} from "./cow.controller";
import validateRequest from "../../middleware/validateRequest";
import { CowValidation } from "./cow.validation";

const cowRouter = express.Router();

cowRouter.post(
  "/",
  validateRequest(CowValidation.createCowZodSchema),
  createCow
);
cowRouter.get("/", getCowsWithFilters);

cowRouter.get("/:id", getCowById);
cowRouter.patch(
  "/:id",
  validateRequest(CowValidation.updateCowZodSchema),
  updateCow
);
cowRouter.delete("/:id", deleteCow);

export default cowRouter;
