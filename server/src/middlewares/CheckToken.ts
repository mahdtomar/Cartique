import { NextFunction, Request, Response } from "express";
import { Error } from "../utils/ServerResponses.js";
import { CustomPayload } from "../types/jwt.js"; // Import the extended type
import { verifyToken } from "../utils/JTW.js";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    console.log('access token : ',accessToken)

    if (!accessToken) {
        Error(res, 401, "Access token missing");
    }

    if (!process.env.JWT_KEY) {
        Error(res, 401, "Authentication configuration error");
    }

    try {
        const decoded = verifyToken(req.cookies.accessToken)
        // Verify the structure matches our custom payload
        if (
            typeof decoded === "object" &&
            "id" in decoded &&
            "role" in decoded &&
            typeof decoded.id === "string" &&
            ["vendor", "customer", "admin"].includes(decoded.role)
        ) {``
            req.user = decoded as CustomPayload;
            next();
        } else {
            Error(res, 401, "Invalid token payload");
        }
    } catch (err) {
        Error(res, 401, "Invalid or expired token");
    }
};
