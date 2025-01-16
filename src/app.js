import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express(); // create express app

app.use(
  // use cors and json and urlencoded middlewares
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb", extended: true })); // json data limit 50mb
app.use(cookieParser({ extends: true })); // cookie parser
app.use(express.urlencoded({ extended: true })); // urlencoded data

export default app; // export app
