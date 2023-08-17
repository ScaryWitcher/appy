import { ArticleModel } from "../models/Article.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await ArticleModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/addArticle", async (req, res) => {
  try {
    const newArticle = new ArticleModel(req.body);
    const response = await newArticle.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/vote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType, currentUser } = req.body;

    const article = await ArticleModel.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const userId = currentUser; // Replace with how you retrieve the current user's ID

    if (voteType === "upvote") {
      if (article.usersUpVoted.includes(userId)) {
        // User already upvoted, remove the upvote
        article.usersUpVoted.pull(userId);
      } else {
        // User upvotes the article
        article.usersUpVoted.push(userId);

        // If user also downvoted before, remove the downvote
        article.usersDownVoted.pull(userId);
      }
    } else if (voteType === "downvote") {
      if (article.usersDownVoted.includes(userId)) {
        // User already downvoted, remove the downvote
        article.usersDownVoted.pull(userId);
      } else {
        // User downvotes the article
        article.usersDownVoted.push(userId);

        // If user also upvoted before, remove the upvote
        article.usersUpVoted.pull(userId);
      }
    }

    // Calculate votes based on the length of upvoted and downvoted arrays
    article.votes = article.usersUpVoted.length - article.usersDownVoted.length;

    const updatedArticle = await article.save();

    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as ArticleRouter };
