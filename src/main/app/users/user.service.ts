import UserModel from "./user.model";

const createUserService = async (data: any) => UserModel.create(data);

//TODO - update endpoint to fetch from users microservice
const getUserService = async (id: string) => UserModel.findById(id);

const getAllUsersService = async () => UserModel.find();

const updateUserService = async (id: string, data: any) =>
  UserModel.findByIdAndUpdate(id, data, {new: true});

const deleteUserService = async (id: string) =>
  UserModel.findByIdAndDelete(id);

export {
  createUserService,
  getUserService,
  updateUserService,
  deleteUserService,
  getAllUsersService
};
