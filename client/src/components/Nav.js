import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="navbar">
      <h3>FeatureBuzz</h3>
      <div className="nav__BtnGroup">
        <Link to="/">All Ideas</Link>
        {/* <Link to="/user/ideas">My Ideas</Link> */}
        <Link to="/createidea">Create Idea</Link>
      </div>
    </nav>
  );
};

export default Nav;
