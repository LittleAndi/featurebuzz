import React, { useState } from "react";
import IdeaContainer from "./IdeaContainer";

const Ideas = ({ socket }) => {
  const [ideas] = useState(generateRandomIdeas(20));

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
    <div className="ideas">
      <h2 style={{ marginBottom: "30px" }}>Ideas</h2>
      <IdeaContainer ideas={ideas} />
    </div>
  );
};

export default Ideas;
