import React, { useState, useEffect } from "react";
import axios from "axios";
import { GetUserID } from "../customHooks/userid";
import { useCookies } from "react-cookie";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const currentUser = GetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/articles/`
        );
        setArticles(response.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    };

    fetchArticles();
  }, []);

  const handleVote = async (articleId, voteType) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/articles/vote/${articleId}`,
        { voteType, currentUser }
      );

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === articleId ? response.data : article
        )
      );
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  return (
    <div className="all-articles-container">
      <h2 className="articles-heading">All Articles</h2>
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article._id} className="article-item">
            <h3 className="article-title">{article.heading}</h3>
            <p className="article-content">{article.mainContent}</p>
            <div className="vote-container">
              {cookies.access_token ? (
                <>
                  <button
                    className={`vote-button upvote-button ${
                      article.usersUpVoted.includes(currentUser)
                        ? "upvoted"
                        : ""
                    }`}
                    onClick={() => handleVote(article._id, "upvote")}
                    disabled={!cookies.access_token}
                  >
                    {article.usersUpVoted.includes(currentUser) ? (
                      <img
                        className="vote-icon"
                        src="https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2FtopArrow.png?alt=media&token=331c1c08-1caf-4bcc-ac70-18f0c8eba964"
                        alt="Upvote"
                      />
                    ) : (
                      <img
                        className="vote-icon"
                        src="https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2FupvoteHighlighted.png?alt=media&token=c210b94f-803d-49d5-89f3-eef432dec941"
                        alt="upvote"
                      />
                    )}
                  </button>
                  <button
                    className={`vote-button downvote-button ${
                      article.usersDownVoted.includes(currentUser)
                        ? "downvoted"
                        : ""
                    }`}
                    onClick={() => handleVote(article._id, "downvote")}
                    disabled={!cookies.access_token}
                  >
                    {article.usersDownVoted.includes(currentUser) ? (
                      <img
                        className="vote-icon"
                        src="https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2FbottomArrow.png?alt=media&token=bb8fe897-b526-4425-91ef-b9f7233d921b"
                        alt="Downvote"
                      />
                    ) : (
                      <img
                        className="vote-icon"
                        src="https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2Fdownvote%20HIghlighted.png?alt=media&token=a045dab0-9f02-41d7-bb30-35b0f86fdc6b"
                        alt="Downvote"
                      />
                    )}
                  </button>
                </>
              ) : (
                <p className="login-message">Login to vote</p>
              )}
              <span className="vote-count">{article.votes}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
