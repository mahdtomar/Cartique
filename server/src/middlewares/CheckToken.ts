import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Error } from "../utils/ServerResponses.js";
import { CustomPayload } from "../types/jwt.js"; // Import the extended type
import { Buffer } from 'node:buffer'

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    console.log(accessToken)
    const buffer =new Buffer( accessToken.split(".")[1],'base64')
    const payload = buffer.toString("utf-8")
    // console.log(JSON.stringify(payload))
    if (!accessToken) {
        return Error(res, 401, "Access token missing");
    }

    if (!process.env.JWT_KEY) {
        return Error(res, 401, "Authentication configuration error");
    }

    try {
        const decoded = jwt.verify(accessToken,`${payload}${process.env.JWT_KEY}`);

        // Verify the structure matches our custom payload
        if (
            typeof decoded === "object" &&
            "id" in decoded &&
            "role" in decoded &&
            typeof decoded.id === "string" &&
            ["vendor", "customer", "admin"].includes(decoded.role)
        ) {
            req.user = decoded as CustomPayload;
            next();
        } else {
            return Error(res, 401, "Invalid token payload");
        }
    } catch (err) {
        return Error(res, 401, "Invalid or expired token");
    }
};
