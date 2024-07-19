// src/components/Navbar.js
import React from "react";
import SearchBar from "./SearchBar";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  return (
    <div className="navbar">
      <div className="navbar-brand">Movie Finder</div>
      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default Navbar;
