import express from "express";
import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { Error } from "./utils/ServerResponses.js";
import cors from "cors";
import AuthRouter from "./routes/AuthRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
app.use(
    cors({
        origin: [
            "http://localhost:5174",
            "http://localhost:5173",
            "http://localhost:5175",
        ],
        credentials: true,
    })
);
app.use("/auth", AuthRouter);
async function connectToDB() {
    try {
        if (!DB_URI) {
            console.error("FATAL: DB_URI environment variable is not defined");
            process.exit(1);
        }
        await mongoose.connect(DB_URI, {
            dbName: "Cartique",
        });
        console.log("Database connected successfully!");
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit on DB connection failure
    }
}

connectToDB().catch((err) => console.error("Connection error:", err));
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Cartique");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    Error(res, 500, `something went wrong ${err.name} : ${err.message}`);
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
