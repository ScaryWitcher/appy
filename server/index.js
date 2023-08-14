import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { ProductRouter } from "./routes/products.js";
import { config } from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://scarywitcher:goodboi@cluster0.ypj5ziq.mongodb.net/myApp?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connected"));

app.use("/auth", userRouter);
app.use("/products", ProductRouter);

app.listen(process.env.PORT || 3001, () =>
  console.log("server started at port 3001")
);
