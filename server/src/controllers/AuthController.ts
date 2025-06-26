import jwt from "jsonwebtoken"; 
import { NextFunction, Request, Response } from "express";
import { Error } from "../utils/ServerResponses.js"; 
import { isCustomPayload } from "../types/jwt.js";
import { createAccessToken } from "../utils/JTW.js";

export const Login = ()=>{
    
}



export const refreshToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.cookies.refreshToken) {
        return Error(res, 401, "Refresh token missing");
    }
    if (!process.env.JWT_KEY) {
        return Error(res, 401, "Authentication configuration error");
    }

    try {
        const decoded = jwt.verify(
            req.cookies.refreshToken,
            process.env.JWT_KEY
        );
        if (!isCustomPayload(decoded)) {
            return Error(res, 401, "Invalid token payload");
        }
        createAccessToken(req, res, decoded);
    } catch (error) {
        // Handle specific JWT errors
        const message =
            error instanceof jwt.TokenExpiredError
                ? "Refresh token expired"
                : "Invalid token";

        return Error(res, 401, message);
    }
};
