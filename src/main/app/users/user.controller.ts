import {Request, Response} from "express";
import {userResponses} from "../../constants/user.constant";
import { logger } from "../../logger";
import {apiErrorResponse, apiResponse} from "../../utility/apiResponse";
import catchAsync from "../../utility/catchAsync";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from "./user.service";

const addUser = catchAsync(async (req: Request, res: Response) => {
  await createUserService(req.body);
  return apiResponse(201, null, userResponses.USER_CREATED, res);
});

//required
const getUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await getUserService(userId);
  if (!user) return apiErrorResponse(400, userResponses.INVALID_ID, res);
  return apiResponse(200, user, null, res);
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await getAllUsersService();
  if (!users) return apiErrorResponse(400, userResponses.INVALID_ID, res);
  return apiResponse(200, users, null, res);
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await getUserService(userId);
  if (!user) return apiErrorResponse(400, userResponses.INVALID_ID, res);
  await updateUserService(userId, req.body);
  return apiResponse(200, null, userResponses.USER_UPDATED, res);
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  await deleteUserService(userId);
  return apiResponse(204, null, null, res);
});

export {addUser, updateUser, getUser, deleteUser, getAllUsers};
