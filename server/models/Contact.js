import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  faceBook: { type: String },
  instagram: { type: String },
  youtube: { type: String },
  x: { type: String },
  email: { type: String },
  PhNo: { type: Number },
});

export const ContactModel = mongoose.model("contact", ContactSchema);
