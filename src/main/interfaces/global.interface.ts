import {Types} from "mongoose";

interface IResponseData {
    [key: string]: any;
    _id?: Types.ObjectId;
}

interface IServiceOptions {
    populate?: string;
}

export {IResponseData, IServiceOptions};
