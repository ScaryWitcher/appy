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
                        src="https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2FupvoteAfter.png?alt=media&token=42e1a377-1e13-4ed7-b99c-1898e911ce6d"
                        alt="Upvote"
                      />
                    ) : (
                      <img
                        className="vote-icon"
                        src="https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2FupvoteBefore.png?alt=media&token=e8907529-96f4-4cd2-9260-205e739a1de3"
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
                        src="https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2FdownvoteAfter.png?alt=media&token=86907058-347f-4e91-87f3-3f039f8845c9"
                        alt="Downvote"
                      />
                    ) : (
                      <img
                        className="vote-icon"
                        src="https://firebasestorage.googleapis.com/v0/b/npstorage.appspot.com/o/images%2FdownvoteBefore.png?alt=media&token=699cc6ca-3c35-4e80-affa-09355abe2f8d"
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
