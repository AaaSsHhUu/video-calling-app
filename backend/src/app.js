import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import {createServer} from "node:http";
import {connectToServer} from "./controllers/socketManager.js";
import cors from "cors";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// importing routes
import userRoutes from "./routes/user.routes.js";

const app = express();
const server = createServer(app);
const io = connectToServer(server);

// middlewares
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit : "40kb", extended : true}));

app.set("port", process.env.PORT || 5000);
app.set("db_uri", process.env.DB_URI);

app.get("/", (req,res) => {
    return res.json({"hello" : "world"})
})

app.use("/api/v1/user/", userRoutes);

app.use(errorMiddleware);

const start = async () => {
    try {
        const connectionDB = await mongoose.connect(process.env.DB_URI);
        console.log(`Connected to DB Host : ${connectionDB.connection.host}`);
    } catch (error) {
        console.log("Connection to DB failed");
    }

    server.listen(app.get("port"), (req,res) => {
        console.log(`Listening on port ${app.get("port")}`);
    })
}

start();

