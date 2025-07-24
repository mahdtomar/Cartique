import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Error, Fail, Success } from "../utils/ServerResponses.js";
import { isCustomPayload } from "../types/jwt.js";
import { createAccessToken, createRefreshToken } from "../utils/JTW.js";
import asyncWrapper from "../utils/AsyncWrapper.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
export const Login = () => {};

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
            name: userName,
            email,
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
        res.cookie("access-token", accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 900000),
        });
        res.cookie("refresh-token", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
        Success(
            res,
            201,
            { user: newUser.name, role: newUser.user_type },
            "user created successfully"
        );
    } catch (error) {
        if (error.code === 11000) {
            Fail(res, 400, "duplicated user");
            return
        }
        Fail(res, 400, "error registering the user : " + error);
    }
};

export const test = async (req: Request, res: Response) => {
    console.log(req.body);

    res.send(`req body is : ${JSON.stringify(req.body)}`);
};
export const refreshToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.cookies.refreshToken) {
        return Error(res, 401, "Refresh token missing");
    }
    if (!process.env.JWT_KEY) {
        return Error(res, 400, "Authentication configuration error");
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
        const accessToken = createAccessToken(req, res, decoded);
        res.cookie("access-token", accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 900000),
        });
    } catch (error) {
        // Handle specific JWT errors
        const message =
            error instanceof jwt.TokenExpiredError
                ? "Refresh token expired"
                : "Invalid token";

        return Error(res, 401, message);
    }
};
