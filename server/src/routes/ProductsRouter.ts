import express from "express";
import { checkToken } from "../middlewares/CheckToken.js";
import { AddProduct } from "../controllers/ProductController.js";
import multer from "multer";
import { uploadImage } from "../utils/UploadImage.js";
import { upload } from "../middlewares/multer.js";
// const upload = multer({
//     dest: "uploads/",
//     storage: multer.diskStorage({
//         destination(req, file, callback) {
//             callback(null, "uploads/");
//         },
//         filename: function (req, file, cb) {
//             cb(
//                 null,
//                 file.originalname +
//                     String(Date.now()) +
//                     "." +
//                     file.mimetype.split("/")[1]
//             );
//         },
//     }),
// });

const ProductRouter = express.Router();

ProductRouter.post("/add", upload.single("image"), uploadImage, AddProduct);

export default ProductRouter;
