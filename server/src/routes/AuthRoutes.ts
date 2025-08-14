import express from "express";
import { refreshToken, Register } from "../controllers/AuthController.js";
import { Success } from "../utils/ServerResponses.js";
// import { Register } from "../controllers/AuthController.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", Register);
AuthRouter.post("/refresh",refreshToken);
export default AuthRouter;
