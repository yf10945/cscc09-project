import React from 'react';
import {bool, func } from 'prop-types';
import "../styles.css";
import { StyledBurger } from "./Burger.styled";
import { useLocation } from "react-router-dom";

{/* Burger Menu: https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/ */}

const Burger = ({ open, setOpen }) => {
    const location = useLocation();
    if (location.pathname === "/" ||
        location.pathname === "/aboutus" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" || 
        location.pathname === "/404") {
      return null;
    }
    
    return (
      <StyledBurger open={open} onClick={() => setOpen(!open)} className="burger">
        <div />
        <div />
        <div />
      </StyledBurger>
    )
  }

Burger.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired
};

export default Burger
