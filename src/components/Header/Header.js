import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink exact to="/">
          <p className="Nav-Title">My Weather Application</p>
        </NavLink>
        <div className="NavItemContainer">
          <NavLink exact to="/" activeClassName="Active">
            Home{" "}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
