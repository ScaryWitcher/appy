import { ArticleModel } from "../models/Article.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const articles = await ArticleModel.find({}).sort({ votes: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching articles", error: err });
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

    const userId = currentUser;

    if (voteType === "upvote") {
      if (article.usersUpVoted.includes(userId)) {
        article.usersUpVoted.pull(userId);
      } else {
        article.usersUpVoted.push(userId);

        article.usersDownVoted.pull(userId);
      }
    } else if (voteType === "downvote") {
      if (article.usersDownVoted.includes(userId)) {
        article.usersDownVoted.pull(userId);
      } else {
        article.usersDownVoted.push(userId);

        article.usersUpVoted.pull(userId);
      }
    }

    article.votes = article.usersUpVoted.length - article.usersDownVoted.length;

    const updatedArticle = await article.save();

    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as ArticleRouter };
