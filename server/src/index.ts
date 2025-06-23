const express = require("express");
import type { Request, Response } from "express";
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            dbName: "Cartique",
        });
        console.log("database connected!");
    } catch (err) {
        console.log(err);
    }
}
connectToDB();

app.get("/", (req: Request, res: Response) => {
    res.send(`Welcome to Cartique`);
});

app.listen(process.env.PORT || 3001, (req: Request, res: Response) => {
    console.log(
        `welcome to cartique, running on port : ${process.env.PORT || 3001}`
    );
});
