import express from "express";
import { checkToken } from "../middlewares/CheckToken.js";
import { AddProduct } from "../controllers/ProductController.js";
import multer from "multer";
import { uploadImage } from "../utils/UploadImage.js";
import { upload } from "../middlewares/multer.js";
// import {checkToken} from './../middlewares/CheckToken.js'

const ProductRouter = express.Router();

ProductRouter.post("/add" , upload.single("image"), AddProduct);

export default ProductRouter;
