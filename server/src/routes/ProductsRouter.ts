import express from "express";
import { checkToken } from "../middlewares/CheckToken.js";
import {
  AddProduct,
  getAllProducts,
  getProduct,
  getProductCount,
} from "../controllers/ProductController.js";
import { upload } from "../middlewares/multer.js";
import { uploadImage } from "../utils/UploadImage.js";
// import {checkToken} from './../middlewares/CheckToken.js'

const ProductRouter = express.Router();

ProductRouter.post(
  "/add",
  checkToken,
  upload.single("image"),
  uploadImage,
  AddProduct
);
// ProductRouter.post("/add" , checkToken,  AddProduct);
ProductRouter.get("/getAllProducts", getAllProducts);
ProductRouter.get("/getProductsCount", getProductCount);
ProductRouter.get("/:id", getProduct);
export default ProductRouter;
