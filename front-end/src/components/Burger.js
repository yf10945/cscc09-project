import React from 'react';
import {bool, func } from 'prop-types';
import "../styles.css";
import { StyledBurger } from "./Burger.styled";

const Burger = ({ open, setOpen }) => {
    return (
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
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
