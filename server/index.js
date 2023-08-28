import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { ProductRouter } from "./routes/products.js";
import { ArticleRouter } from "./routes/articles.js";
import { config } from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());


config();

mongoose
  .connect(process.env.MONGODB_KEY)
  .then(() => console.log("db connected"));

app.use("/auth", userRouter);
app.use("/products", ProductRouter);
app.use("/articles", ArticleRouter);

app.listen(process.env.PORT || 3001, () =>
  console.log(`server started at port ${process.env.PORT || 3001}`)
);
