export interface IZodErrorObj {
  code: string;
  maximum: number;
  type: string;
  inclusive: boolean;
  message: string;
  path: Array<string>;
}
