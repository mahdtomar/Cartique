// routes/LanguagesRouter.js
import express from "express";
import { getLanguages } from "../controllers/LanguageController.js";

const languagesRouter = express.Router();

languagesRouter.get("/", getLanguages);

export default languagesRouter;
