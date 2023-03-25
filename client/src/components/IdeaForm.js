import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { toast } from "react-toastify";

const IdeaForm = ({ socket }) => {
  const navigate = useNavigate();
  const [pitch, setPitch] = useState("");
  const [description, setDescription] = useState("");

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
    socket.on("createIdeaMessage", (data) => {
      //👇🏻 Displays the server's response
      toast.success(data, { toastId: "createIdeaMessage" });
      navigate("/");
    });
    authenticateUser();
  }, [socket, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    //👇🏻 Gets the id and email from the local storage
    const id = localStorage.getItem("_id");
    const email = localStorage.getItem("_myEmail");

    socket.emit("createIdea", { id, email, pitch, description });

    setPitch("");
    setDescription("");
  }

  function handlePitchChange(e) {
    setPitch(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <>
      <Nav />

      <div className="ideaForm">
        <h2 style={{ marginBottom: "30px" }}>Add an idea</h2>
        <form className="ideaForm__form" onSubmit={handleSubmit}>
          <label htmlFor="pitch">Pitch</label>
          <input
            className="input"
            type="text"
            value={pitch}
            id="pitch"
            onChange={handlePitchChange}
          />
          <br />
          <label htmlFor="description">Full Description</label>
          <textarea
            className="input"
            value={description}
            id="description"
            rows={5}
            onChange={handleDescriptionChange}
          />
          <br />
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default IdeaForm;
