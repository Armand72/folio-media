import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as ReactChevron } from "../assets/images/chevron.svg";
import { ReactComponent as ReactGroup } from "../assets/images/group.svg";
import { ReactComponent as ReactCustom } from "../assets/images/custom.svg";
import { ReactComponent as ReactArrow } from "../assets/images/arrow.svg";
import { ReactComponent as ReactCamera } from "../assets/images/camera.svg";
import { ReactComponent as ReactDesign } from "../assets/images/design.svg";
import { ReactComponent as ReactHeart } from "../assets/images/heart.svg";
import { GET_FILTER, GET_MEMBERS } from "../store/actions/types";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [activeMenu, setActiveMenu] = useState("menu");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const handleClick = (category) => {
    dispatch({ type: GET_FILTER, payload: category });
    dispatch({ type: GET_MEMBERS });
    setDropdown(!dropdown);
  };

  function DropdownItem(props) {
    return (
      <div
        className="dropdown__item"
        onClick={() =>
          props.goToMenu
            ? setActiveMenu(props.goToMenu)
            : handleClick(props.category)
        }
      >
        <div className="dropdown__item__left">
          <span className="icon icon--left">{props.icon && props.icon}</span>
          <h2>{props.children}</h2>
        </div>

        <span className="icon">{props.chevron && <ReactChevron />}</span>
      </div>
    );
  }

  return (
    <>
      <div className="navbar">
        <div className="navbar__title">
          <h1>Folio Media</h1>
        </div>
        <div className="navbar__image" onClick={() => setDropdown(!dropdown)}>
          <img src="/images/loupe.svg"></img>
        </div>
        {/* dropdown */}
        {dropdown && (
          <div
            className="dropdown"
            style={{ height: menuHeight }}
            ref={dropdownRef}
          >
            <CSSTransition
              in={activeMenu === "menu"}
              timeout={500}
              classNames="menu-primary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div>
                <DropdownItem icon={<ReactGroup />} category="all">
                  All
                </DropdownItem>
                <DropdownItem icon={<ReactCustom />} chevron goToMenu="custom">
                  Custom
                </DropdownItem>
              </div>
            </CSSTransition>

            <CSSTransition
              in={activeMenu === "custom"}
              timeout={500}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div>
                <DropdownItem goToMenu="menu" icon={<ReactArrow />}>
                  Go Back
                </DropdownItem>
                <DropdownItem icon={<ReactCamera />} category="photographer">
                  Photographers
                </DropdownItem>
                <DropdownItem icon={<ReactDesign />} category="designer">
                  Designers
                </DropdownItem>
                <DropdownItem category="liked" icon={<ReactHeart />}>
                  Liked
                </DropdownItem>
              </div>
            </CSSTransition>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
