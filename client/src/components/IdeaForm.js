import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

function IdeaForm({ onSubmit }) {
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
    authenticateUser();
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ pitch, description });
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
}

export default IdeaForm;
