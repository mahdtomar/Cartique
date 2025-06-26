import jwt, { JwtPayload } from "jsonwebtoken";
import { Error } from "./ServerResponses.js";
import { Request, Response } from "express";
import { CustomPayload } from "../types/jwt.js";

export const createAccessToken = (
    req: Request,
    res: Response,
    payload: CustomPayload
) => {
    if (!process.env.JWT_KEY) {
        return Error(res, 401, "Authentication Error");
    }
    const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "15m",
    });
    req.user = payload;
    return token;
};

export const createRefreshToken = (
    req: Request,
    res: Response,
    payload: CustomPayload
) => {
    if (!process.env.JWT_KEY) {
        return Error(res, 401, "Authentication Error");
    }
    const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "7d",
    });
    req.user = payload;
    return token;
};
