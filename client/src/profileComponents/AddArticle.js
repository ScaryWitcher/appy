import React, { useState } from "react";
import axios from "axios";
import { GetUserID } from "../customHooks/userid";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = GetUserID();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/articles/addArticle`,
        {
          user: user,
          heading: title,
          mainContent: content,
          votes: 0,
          usersUpVoted: [],
          usersDownVoted: [],
        }
      );

      // Display success alert
      alert("Article added successfully!");

      // Reset form fields
      setTitle("");
      setContent("");
    } catch (err) {
      // Display error alert
      alert("Error adding article. Please try again.");
    }
  };

  return (
    <div id="addArticleContainer">
      <h2 id="addArticleHeading">Add Article</h2>
      <form onSubmit={handleSubmit} id="articleFormSection">
        <div>
          <label htmlFor="title" className="inputLabel">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="inputField"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content" className="inputLabel">
            Content:
          </label>
          <textarea
            id="content"
            className="inputField"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" id="submitArticleButton">
          Add Article
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
