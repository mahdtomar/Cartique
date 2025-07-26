import { Request, Response } from "express";
import asyncWrapper from "../utils/AsyncWrapper.js";
import { Success } from "../utils/ServerResponses.js";

export const AddProduct = asyncWrapper(async (req: Request, res: Response) => {
    console.log("run add product");
    Success(
        res,
        200,
        // JSON.stringify({ fields: req.fields, files: req.files }),
        JSON.stringify({
            done: {
                distenation: req.file?.destination,
                name: req.file?.filename,
                path:req.file?.path
            },
        }),
        "this is the body"
    );
});
