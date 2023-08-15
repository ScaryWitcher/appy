import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  products: [{ type: mongoose.Types.ObjectId, ref: "products" }],
});
export const CartModel = mongoose.model("contact", CartSchema);
