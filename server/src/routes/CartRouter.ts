import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "./../controllers/cartController.js";
import { checkToken } from "../middlewares/CheckToken.js";

const cartRouter = express.Router();

cartRouter.get("/", checkToken, getCart);
cartRouter.post("/", checkToken, addToCart);
cartRouter.put("/", checkToken, updateCartItem);
cartRouter.delete("/:cartItemId", checkToken, removeFromCart);

export default cartRouter;
