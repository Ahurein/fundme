import {Response} from "express";
import {IResponseData} from "../interfaces/global.interface";

const apiResponse = (statusCode: number,data: IResponseData | null, message: String | null,res: Response) => {
  if (data) {
    res.status(statusCode).json({
      data,
    });
  } else {
    res.status(statusCode).json({message});
  }
};

const apiErrorResponse = (statusCode: number, message: any, res: Response) => {
  res.status(statusCode).json({
    message,
  });
};

export {apiResponse, apiErrorResponse};
