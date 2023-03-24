import React from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import "./IdeaContainer.css";

const IdeaContainer = ({ ideas, socket }) => {
  const handleUpvote = (id) => {
    console.log("Upvote", id);
  };

  return (
    <main className="ideaContainer">
      {ideas.map((idea) => (
        <div className="idea" key={idea.id}>
          <h3 className="idea__pitch">{idea.pitch}</h3>
          <p className="idea__description">{idea.description}</p>
          <button className="upvoteIcon" onClick={() => handleUpvote(idea.id)}>
            <MdOutlineArrowUpward
              style={{ fontSize: "20px", marginBottom: "5px" }}
            />
            <p style={{ fontSize: "12px", color: "#ce7777" }}>
              {idea.vote_count}
            </p>
          </button>
        </div>
      ))}
    </main>
  );
};

export default IdeaContainer;
