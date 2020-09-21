import React, { useEffect } from "react";
import NavbarPortfolio from "./NavbarPortfolio";
import { useSelector, useDispatch } from "react-redux";
import { GET_MEMBER } from "../store/actions/types";
import { useLocation } from "react-router-dom";
import PortfolioList from "./PortfolioList";

const Portfolio = () => {
  const selectIsOn = (state) => state.members.member.memberData;
  const member = useSelector(selectIsOn);
  let location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const split = location.pathname.split("/")[1];
    dispatch({ type: GET_MEMBER, payload: split });
  }, []);

  return (
    <>
      <div className="phone-container">
        <NavbarPortfolio />
        <div className="limitation"></div>
        <div className="homepage homepage--portfolio">
          <h1>{member && member.title}</h1>
          <div className="portfolio-container">
            {member &&
              member.portfolio.map((props, index) => (
                <PortfolioList key={index} {...props} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
