import jwt from "jsonwebtoken";
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
        expiresIn:'60000' // 1 minute
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

export const verifyToken = (token:string)=>{

        console.log("verifying token ====================")
        // const signature = `${process.env.JWT_KEY}`;
        if(!process.env.JWT_KEY){
        console.log("error while verifying token : Configuration Error")
            return 
        }
        // const CryptedSignature = Buffer.from(signature).toString("base64");
        // console.log( CryptedSignature)
        return jwt.verify(token,process.env.JWT_KEY)

}