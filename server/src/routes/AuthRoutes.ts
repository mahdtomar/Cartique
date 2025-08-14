import express from "express";
import { getUserData, Login, refreshToken, Register } from "../controllers/AuthController.js";
import { Success } from "../utils/ServerResponses.js";
// import { Register } from "../controllers/AuthController.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", Register);
AuthRouter.post("/login", Login);
AuthRouter.post("/refresh", refreshToken);
AuthRouter.get("/getUser", getUserData);

export default AuthRouter;
