import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as ReactHeart } from "../assets/images/heart-home.svg";
import { ReactComponent as ReactShare } from "../assets/images/share.svg";
import { GET_LIKE } from "../store/actions/types";
import { useHistory } from "react-router-dom";

const MemberList = (props) => {
  const {
    name,
    src,
    alt,
    likes,
    description,
    likeBool,
    id,
    refFunction,
    length,
    index,
  } = props;
  const dispatch = useDispatch();

  let history = useHistory();

  const likeMember = () => {
    console.log(id);
    dispatch({ type: GET_LIKE, payload: id });
  };

  const handleClick = () => {
    history.push(`/${id}`);
  };

  return (
    <>
      <div ref={length === index + 1 ? refFunction : null} className="member">
        <div>
          <div className="member__title">
            <div className="member__title__text">
              <h1>{name}</h1>
            </div>

            <span className="member__line"></span>
          </div>
          <div className="member__image" onClick={() => handleClick()}>
            <img src={src} alt={alt}></img>
          </div>
          <div className="member__sub-container">
            <div className="member__sub-container__top">
              <div className="display">
                <div
                  className={
                    likeBool ? "icon-home icon-home--fill" : "icon-home"
                  }
                  onClick={likeMember}
                >
                  <ReactHeart />
                </div>
                <p className="padding-left">{likes}</p>
                <p className="pl">likes</p>
              </div>
              <div className="icon-home icon-home--fill">
                <ReactShare />
              </div>
            </div>
            <div className="member__sub-container__bottom">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberList;
