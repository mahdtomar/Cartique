import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const app = express();
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

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

const server = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
