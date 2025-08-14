import { Request, Response } from "express";
import asyncWrapper from "../utils/AsyncWrapper.js";
import { Success } from "../utils/ServerResponses.js";
import Product from "../models/ProductModel.js";

export const AddProduct = asyncWrapper(async (req: Request, res: Response) => {
    // console.log("run add product");
    // console.log(req.body);
    // console.log(req.files)
    const product = new Product({...req.body , vendor_id : req.user?.id})
    await product.save()
    Success(
        res,
        200,
        // JSON.stringify({ fields: req.fields, files: req.files }),
        product.toPublicJSON(),
        "this is the body"
    );
});
