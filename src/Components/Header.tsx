import React from "react";
import { Header, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function CustomHeader() {
  return (
    <Segment inverted textAlign="center" style={{ padding: "2em 0" }}>
      <Header as="h1" inverted>
        Witamy w Świecie Samochodów!
      </Header>
      <NavLink
        to="/cars"
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        Samochody
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        Info
      </NavLink>
    </Segment>
  );
}
