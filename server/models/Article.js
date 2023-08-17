import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  heading: { type: String, required: true },
  mainContent: { type: String, required: true },
  votes: { type: Number },
  usersUpVoted: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  usersDownVoted: [{ type: mongoose.Types.ObjectId, ref: "users" }],
});

export const ArticleModel = mongoose.model("article", ArticleSchema);
