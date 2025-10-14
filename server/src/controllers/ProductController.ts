import { Request, Response } from "express";
import asyncWrapper from "../utils/AsyncWrapper.js";
import { Success, Fail } from "../utils/ServerResponses.js";
import Product from "../models/ProductModel.js";
import redisClient from "../cache/redisClient.js";
/**
 * add new public product
 */
export const AddProduct = asyncWrapper(async (req: Request, res: Response) => {
  const product = new Product({ ...req.body, vendor_id: req.user?.id });
  await product.save();
  Success(res, 200, product.toPublicJSON(), "Product Added Successfully");
});

/**
 * read the limit and page queries and return the cached target products if exist or fetch from the database and caches them for next time
 * also if search exists we are searching the products with the text index and sorting them by score
 */
export const getAllProducts = asyncWrapper(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = String(req.query.searchText || "");

  const skip = Math.max(page - 1, 0) * limit;
  console.log("page:", page, "limit:", limit, "skip:", skip);

  const cacheKey = `products?limit=${limit}&page=${page}&search=${search}`;
  const result = await redisClient.get(cacheKey);
  if (result) {
    return Success(res, 200, JSON.parse(result), "products from cache");
  }

  try {
    let products = await Product.find(
      search ? { $text: { $search: search } } : {},
      search ? { score: { $meta: "textScore" } } : {}
    )
      .sort(search ? { score: { $meta: "textScore" } } : {})
      .skip(skip)
      .limit(limit);

    if (products.length === 0 && search) {
      console.log("trying regex search");
      products = await Product.find({
        title: { $regex: search, $options: "i" },
      })
        .skip(skip)
        .limit(limit);
    }

    const publicProducts = products.map((p) => p.toPublicJSON());

    await redisClient.set(cacheKey, JSON.stringify(publicProducts), {
      EX: 30,
    });

    Success(res, 200, publicProducts, "got products successfully");
  } catch (error) {
    console.error(error);
    Fail(res, 500, "Error Getting the products");
  }
});

/**
 * Counts the products documents in the database and return it
 */
export const getProductCount = asyncWrapper(async (req, res) => {
  try {
    const cachedCount = await redisClient.get("products-count");
    if (cachedCount) {
      Success(res, 200, { count: cachedCount }, "product count");
      return;
    }

    const productCount = await Product.countDocuments();
    await redisClient.set("products-count", JSON.stringify(productCount), {
      EX: 30,
    });
    Success(res, 200, { count: productCount }, "product count");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      Fail(res, 500, error.message || JSON.stringify(error));
    }
  }
});

/**
 * extracting the product `id` from params and fetch the product if the ID exists
 * @returns  `product` if id is not found return `404`
 */
export const getProduct = asyncWrapper(async (req, res) => {
  try {
    const productId = req.params.id;
    const cache = await redisClient.get(`product-${productId}`);
    if (cache) {
      Success(res, 200, JSON.parse(cache), "cached product");
      return;
    }

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      Fail(res, 404, `Product not found`);
      return;
    }

    const publicProduct = product.toPublicJSON();
    await redisClient.set(
      `product-${productId}`,
      JSON.stringify(publicProduct),
      { EX: 30 }
    );
    Success(res, 200, publicProduct, "product info");
  } catch (error) {
    error instanceof Error
      ? Fail(res, 400, error.message)
      : Fail(res, 500, "unknown Error");
  }
});
/**
 *
 */
export const getProductSuggestion = asyncWrapper(async (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search : "";

  const cacheKey = `products-suggestions-${search.toLowerCase()}`;
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    Success(res, 200, JSON.parse(cachedData));
    return;
  }

  let products = await Product.find(
    { $text: { $search: search } },
    { score: { $meta: "textScore" }, title: 1 }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(5);

  if (!products.length) {
    products = await Product.find(
      { title: { $regex: search, $options: "i" } },
      { title: 1 }
    ).limit(5);
  }

  await redisClient.set(cacheKey, JSON.stringify(products), {
    EX: 60,
  });
  Success(res, 200, products, "search suggestions");
});
