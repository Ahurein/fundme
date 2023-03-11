import {IZodErrorObj} from "../interfaces/zod.interface";

export const mapZodError = (errors: Array<IZodErrorObj>) => {
  const formattedErrors = errors.map((el) => {
    return el.message;
  });
  return formattedErrors;
};
