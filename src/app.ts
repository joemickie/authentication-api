import express from "express";
import rateLimit from "express-rate-limit";
import { authRouter } from "./routes/auth.routes";

export const app = express();

app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.use("/auth", authRouter);