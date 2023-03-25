import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import IdeaContainer from "./IdeaContainer";

const Ideas = ({ socket }) => {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);

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
    socket.emit("allIdeas", "search");
    socket.on("allIdeasMessage", (data) => {
      console.log(data);
      setIdeas(data.ideas);
    });
  }, [socket, navigate]);

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
