import React, { useEffect } from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import { toast } from "react-toastify";
import "./IdeaContainer.css";

const IdeaContainer = ({ ideas, socket }) => {
  useEffect(() => {
    socket.on("upvoteSuccess", (data) => {
      toast.success(data.message, { toastId: "upvoteSuccess" });
      console.log(data.item[0]._ref);
    });
    socket.on("upvoteError", (data) => {
      toast.error(data.error_message, { toastId: "upvoteError" });
    });
  }, [socket]);

  const handleUpvote = (id) => {
    socket.emit("ideaUpvote", {
      userId: localStorage.getItem("_id"),
      ideaId: id,
    });
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
