import express from "express";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  productImages: [{ type: String }],
});

export const ProductModel = new mongoose.model("products", ProductSchema);
