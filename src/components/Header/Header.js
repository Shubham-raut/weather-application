import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink className="Nav-Title" exact to="/">
          My Weather Application
        </NavLink>
        <div className="NavItemContainer">
          <NavLink exact to="/" activeClassName="Active">
            Home
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
