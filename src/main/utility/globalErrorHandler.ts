import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {apiErrorResponse} from "./apiResponse";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log('error: ', error)
  if(error.name === "MongoServerError"){
    switch(error.code){
      case 11000: 
        return apiErrorResponse(400, "Data duplication is not allowed", res);
        break;
      default:
        return apiErrorResponse(400, "We encountered an error manipulating your data, try again", res)
    }
  }else if(error.name === "ValidationError"){
    return apiErrorResponse(400, "The data you are sending is not in the correct format", res)
  }
  apiErrorResponse(400, "Invalid request", res);
};

export default globalErrorHandler;