import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger";
import { apiResponse } from "../../utility/apiResponse";
import catchAsync from "../../utility/catchAsync";
import { createProfileService, getProfileService } from "./profile.service";


const createProfile = catchAsync(async (req: Request, res: Response, next: NextFunction)  => {
    const data = req.body;
    const userProfile = await createProfileService(data);
    return apiResponse(200, userProfile, null, res);
})

const getProfile = catchAsync(async (req: Request, res: Response, next: NextFunction)  => {
    const {id} = req.params;
    const userProfile = await getProfileService(id);
    if(!userProfile) return apiResponse(400, null, 'No profile exist for this user', res)
    return apiResponse(200, userProfile, null, res);
})



export {createProfile, getProfile};