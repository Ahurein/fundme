import { keys } from "../config/keys"

const { S3Client } = require('@aws-sdk/client-s3')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')

const app = express()

const s3 = new S3Client({
    region: keys.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });


  
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    const error: {message?: String, name?: String, stack?: String, statusCode?: Number} = new Error("Invalid file format");
    error.statusCode = 400
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(error, false);
    }
  };

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'some-bucket',
    key: function (req: Request, file: Express.Multer.File, cb: any) {
      cb(null, Date.now().toString())
    }
  })
})