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
import ProductRouter from "./routes/ProductsRouter.js";
import { createClient } from 'redis';
import commentsRouter from "./routes/CommentsRouter.js";

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
app.use("/products", ProductRouter);
app.use("/comments", commentsRouter);
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

const redisClient = createClient({
    username: 'default',
    password: process.env.REDISPWD,
    socket: {
        host: 'redis-11229.crce176.me-central-1-1.ec2.redns.redis-cloud.com',
        port: 11229
    }
});

redisClient.on('error', err => console.log('Redis redisClient Error', err));

await redisClient.connect();

// redisClient.del("products?limit=20&page=0")
// await redisClient.del('foo', 'bar');
// const result = await redisClient.get('foo');
// console.log(result)  // >>> bar



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
