import {Types} from "mongoose";

interface IResponseData {
    [key: string]: any;
    _id?: Types.ObjectId;
}

export {IResponseData};
