import User from "../models/UserModel.js";
import asyncWrapper from "../utils/AsyncWrapper.js";
import { Fail, Success } from "../utils/ServerResponses.js";

export const getCart = asyncWrapper(async (req, res) => {});

export const addToCart = asyncWrapper(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user?.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    Fail(res, 401, "Authentication Error.");
    return;
  }
  const exists = user.cart.find((product) => {
    return String(product.product_id) === String(productId);
  });
  if (!exists) {
    const cart = [...user.cart, { product_id: productId, count: 1 }];
    user.cart = cart;
    await user.save();
    Success(res, 201, { cart: user.cart }, "adding to cart");
  }
  Fail(res, 409, "Product already exists");
});

export const updateCartItem = asyncWrapper(async (req, res) => {});
export const removeFromCart = asyncWrapper(async (req, res) => {});
