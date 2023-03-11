import {NextFunction, Request, Response} from "express";
import {mapZodError} from "../helpers/mapZodError";
import {apiErrorResponse} from "../utility/apiResponse";

export const validateResources = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
      });
      next();
    } catch (error: any) {
      const errorMessages = mapZodError(error.errors);
      console.log("error messages: ",errorMessages);
      apiErrorResponse(400, errorMessages, res);
    }
  };
};
