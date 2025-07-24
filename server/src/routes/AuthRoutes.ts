import express from "express";
import { Register, test } from "../controllers/AuthController.js";
// import { Register } from "../controllers/AuthController.js";

const AuthRouter = express.Router();

// AuthRouter.post("/refresh");
AuthRouter.post("/register", Register);
export default AuthRouter;
