import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  heading: { type: String, required: true },
  mainContent: { type: String, required: true },
  upVoteCount: { type: Number },
  downVoteCount: { type: Number },
});

export const ArticleModel = mongoose.model("article", ArticleSchema);
