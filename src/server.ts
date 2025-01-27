import "reflect-metadata";
import * as dotenv from "dotenv";
import {authMiddleware} from "./middleware/authMiddleware";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import {AppDataSource} from "./data-source";

dotenv.config();

const main = async () => {
    await AppDataSource.initialize()
        .then(() => console.log("Connected to SQLite"))
        .catch((err) => console.error("Connection error:", err));

    const app = express();
    app.use(cors());
    app.use(express.json());

    app
        .use("/api/auth", authRouter)
        .get("/api/protected", authMiddleware, (req, res) => {
            res.json({userId: (req as any).userId, message: "Protected area! 🔒"});
        })
        .get("/api/unprotected", (req, res) => {
            res.json({userId: (req as any).userId, message: "Unprotected area! 🔒"});
        });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

main().catch((err) => console.error("Error:", err));