import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Error, Fail, Success } from "../utils/ServerResponses.js";
import { CustomPayload, isCustomPayload } from "../types/jwt.js";
import { createAccessToken, createRefreshToken, verifyToken } from "../utils/JTW.js";
import asyncWrapper from "../utils/AsyncWrapper.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const Login = asyncWrapper(async(req,res,next)=>{
    const {email,password} = req.body
    if(!req.body || !email ||!password){
        Fail(res,400,'wrong / empty payload')
    }

    if (!process.env.SALTROUNDS) {
    Error(res, 400, "configuration error");
    return;
    }

    const user = await User.findOne({email:email.toLowerCase()})
    if(!user){
        Fail(res,404,'user not found')
        return;
    }

    const validatePassword = await bcrypt.compare(
    password,
    user.password
    );

    if(!validatePassword){
        Fail(res,400,'Wrong Email or password')
        return 
    }

    const accessToken = createAccessToken(req,res ,{
        id: String(user._id),
        role: user.user_type,
    })
    const refreshToken = createRefreshToken(req,res ,{
        id: String(user._id),
        role: user.user_type,
    })

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + (1000 * 60 * 5)),
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)),
    });
    Success(
        res,
        200,
        { name: user.name, role: user.user_type },
        "user created successfully"
    );
})
export const Register = async (req: Request, res: Response) => {
    if (!req.body) {
        console.log(req.body);
        Fail(res, 400, "no payload detected");
    }
    const { userName, email, password, phoneNumber } = req.body;
    if (!userName || !email || !password) {
        Fail(res, 400, "username & email & password are required");
    }
    try {
        if (!process.env.SALTROUNDS) {
            Error(res, 400, "configuration error");
            return;
        }

        const hashedPassword = bcrypt.hashSync(
            password,
            +process.env.SALTROUNDS
        );

        const newUser = new User({
            name: userName.toLowerCase(),
            email:email.toLowerCase(),
            password: hashedPassword,
            phone: phoneNumber,
        });

        const refreshToken = createRefreshToken(req, res, {
            id: String(newUser._id),
            role: newUser.user_type,
        });

        const accessToken = createAccessToken(req, res, {
            id: String(newUser._id),
            role: newUser.user_type,
        });

        await newUser.save();
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + (1000 * 60 * 5)),
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)),
        });
        Success(
            res,
            201,
            { name: newUser.name, role: newUser.user_type },
            "user created successfully"
        );
    } catch (error : any) {
        if (error.code === 11000) {
            Fail(res, 400, "duplicated user");
            return
        }
        Fail(res, 400, "error registering the user : " + error);
    }
};
export const refreshToken = (
    req: Request,
    res: Response,
) => {
    if (!req.cookies.refreshToken) {
        Error(res, 401, "Refresh token missing");
        return 
    }
    if (!process.env.JWT_KEY) {
        Error(res, 400, "Authentication configuration error");
        return
    }
    try {
        const decoded = verifyToken(req.cookies.refreshToken)
        console.log('decoded refresh token : ',decoded)
        if (!isCustomPayload(decoded)) {
            Error(res, 401, "Invalid token payload");
            return 
        }
        const cleanPayload: CustomPayload = {
            id: decoded.id,
            role: decoded.role
        };
        // createAccessToken(req, res, cleanPayload);
        const accessToken = createAccessToken(req, res, cleanPayload);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + (1000 * 60 * 5)),
        });
        Success(res,201,{access:accessToken},'token refreshed')
    } catch (error) {
        const message =
            error instanceof jwt.TokenExpiredError
                ? "Refresh token expired"
                : "Invalid token";
            console.log('Error refreshing the token : ',error)
        Error(res, 401, message);
    }
};
export const getUserData = asyncWrapper(async(req , res ) =>{
try{
        if(!req.cookies.refreshToken){
            Fail(res,401,'unAuthorized Request')
            return
        }
        const decoded = verifyToken(req.cookies.refreshToken)
        if(!decoded){
            console.log('failed : ',decoded)
            Fail(res,400,'error validating user')
            return
        }
        if (!isCustomPayload(decoded)) {
        Error(res, 400, "Invalid token payload");
        return 
        }
    const user = await User.findById(String(decoded.id))
    Success(res,200,{name:user?.name, role:user?.user_type , id:user?.id},'user data')
} catch(error){
    Fail(res,400,`error getting user data : ${error}`)
}
})