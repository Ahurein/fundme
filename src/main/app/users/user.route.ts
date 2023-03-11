import express, {Express, IRouter} from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./user.controller";
import {userSchema} from "../../schema/user.schema";
import {validateResources} from "../../middleware/validateResources";

export const userRoute = (router: IRouter) => {
  router.route("/users").post(validateResources(userSchema), addUser).get(getAllUsers);
  router
    .route("/users/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);
};
