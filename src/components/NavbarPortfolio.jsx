import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as ReactArrow } from "../assets/images/arrow.svg";

const NavbarPortfolio = (props) => {
  const history = useHistory();
  const gotoMenu = () => {
    history.push("/");
  };
  return (
    <>
      <div
        className="navbar navbar--portfolio"
        onClick={props.handler}
        onClick={gotoMenu}
      >
        <ReactArrow />
        <p>See other talents</p>
      </div>
    </>
  );
};

export default NavbarPortfolio;
