import { Request, Response } from "express";
import asyncWrapper from "../utils/AsyncWrapper.js";
import { Success ,Fail} from "../utils/ServerResponses.js";
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
 * also if search exists we are searching the products with the text index and sorting them by score 
 */
export const getAllProducts = asyncWrapper(async(req,res)=>{
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const search = String(req.query.searchText || "");

    console.log(search)
    const result = await redisClient.get(`products?limit=${limit}&page=${page}&search=${search}`)
    if(result) {
        Success(res,200,JSON.parse(result),'products from cache')
        return
    }
   try{
    let products = await Product.find(
        search ? { $text: { $search: search } } : {}, 
        search ? { score: { $meta: "textScore" } } : {} 
        )
        .sort(search ? { score: { $meta: "textScore" } } : {})
        .skip(page * limit)
        .limit(limit);
        if (products.length === 0  && search){
            console.log("trying regex search")
            products = await Product.find(
                { title: { $regex: search, $options: "i" } },
                )
                .skip(page * limit)
                .limit(limit);
                console.log(products)
        }
    const publicProducts = products.map(product=>product.toPublicJSON())
    await redisClient.set(`products?limit=${limit}&page=${page}&search=${search}`,JSON.stringify(publicProducts),{EX:300})
    Success(res,200,publicProducts,'got products successfully')
   } catch(error){
    console.error(error)
    Fail(res,500,'Error Getting the products')
   }
})