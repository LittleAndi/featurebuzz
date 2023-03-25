import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import IdeaContainer from "./IdeaContainer";

const Ideas = ({ socket }) => {
  const navigate = useNavigate();
  const [ideas] = useState(generateRandomIdeas(15));

  useEffect(() => {
    function authenticateUser() {
      const id = localStorage.getItem("_id");
      /*
        👇🏻 If ID is false, redirects the user to the login page
        */
      if (!id) {
        navigate("/login");
      }
    }
    authenticateUser();
  }, [navigate]);

  function generateRandomIdeas(numIdeas) {
    const ideas = [];

    for (let i = 1; i <= numIdeas; i++) {
      const pitch = `Pitch for idea ${i}`;
      const description = `The Elevator Pitch is a concise and compelling summary of idea ${i}, meant to capture someone's attention in a short amount of time. The Full Description could provide more context and detail.`;
      const vote_count = Math.floor(Math.random() * 10);

      ideas.push({
        id: i,
        pitch,
        description,
        vote_count,
      });
    }

    return ideas;
  }

  return (
    <>
      <Nav />
      <div className="ideas">
        <h2 style={{ marginBottom: "30px" }}>Ideas</h2>
        <IdeaContainer ideas={ideas} />
      </div>
    </>
  );
};

export default Ideas;
