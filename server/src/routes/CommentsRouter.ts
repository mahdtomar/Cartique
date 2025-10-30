import { Router } from "express";
import {
  addComment,
  getProductComments,
} from "../controllers/CommentController.js";
import { checkToken } from "../middlewares/CheckToken.js";

const commentsRouter = Router();
commentsRouter.post("/add", checkToken, addComment);
commentsRouter.get("/get", getProductComments);

export default commentsRouter;
