import jwt from "jsonwebtoken";
import {promisify} from "util";

const decodeToken = (token: string, env: string) => {
  return jwt.verify(token, env)
};

const encodeToken = (data: any, env: string) => {
  if (!data) return {};

  return jwt.sign({data}, env);
};


export {decodeToken, encodeToken}