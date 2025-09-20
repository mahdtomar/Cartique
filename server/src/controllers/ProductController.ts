import { Request, Response } from "express";
import asyncWrapper from "../utils/AsyncWrapper.js";
import { Success } from "../utils/ServerResponses.js";
import Product from "../models/ProductModel.js";
import redisClient from "../cache/redisClient.js";

export const AddProduct = asyncWrapper(async (req: Request, res: Response) => {
    const product = new Product({...req.body , vendor_id : req.user?.id})
    await product.save()
    Success(
        res,
        200,
        product.toPublicJSON(),
        "Product Added Successfully"
    );
});

/**
 * get all products
 * read the limit and page queries and return the cached target products if exist or fetch from the database and caches them for next time 
 */
export const getAllProducts = asyncWrapper(async(req,res)=>{
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const result = await redisClient.get(`products?limit=${limit}&page=${page}`)
    if(result) {
        Success(res,200,JSON.parse(result),'products from cache')
        return
    }
    const products = await Product.find().skip(page * limit).limit(limit)
    const publicProducts = products.map(product=>product.toPublicJSON())
    await redisClient.set(`products?limit=${limit}&page=${page}`,JSON.stringify(publicProducts),{EX:300})
    Success(res,200,publicProducts,'got products successfully')
})