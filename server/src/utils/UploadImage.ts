import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";
import { Fail, Success } from "./ServerResponses.js";
import asyncWrapper from "./AsyncWrapper.js";
export const uploadImage = asyncWrapper(async (req, res, next) => {
    cloudinary.v2.config({
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        cloud_name: process.env.CLOUDINARY_API_CLOUDNAME,
    });
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        if (!req.file) {
            return Fail(res, 404, "Error Uploading image : image not found");
        }
        const result = await cloudinary.v2.uploader.upload(req.file?.path, {
            ...options,
            folder: "Cartique",
            resource_type: "image",
        })
        console.log(result);
        next && next();
    } catch (error) {
        console.error(error);
    }
});
// async (req: Request, res: Response, next: NextFunction) => ;
