import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import MemberList from "./MemberList";
import { useSelector } from "react-redux";
import { GET_MEMBERS, SET_LOADING, ADD_PAGE } from "../store/actions/types";

const Homepage = () => {
  const [homepage, setHomepage] = useState(true);
  const [activeMenu, setActiveMenu] = useState("homepage");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: GET_MEMBERS });
  }, []);

  const filter = (state) => state.members.filterOption;
  const filterOption = useSelector(filter);

  const visibles = (state) => state.members.visibles;
  const visible = useSelector(visibles);

  const load = (state) => state.members.loading;
  const loading = useSelector(load);

  const hasMoreFunc = (state) => state.members.hasMore;
  const hasMore = useSelector(hasMoreFunc);

  const handler = () => {
    setHomepage(!homepage);
    if (activeMenu === "homepage") {
      setActiveMenu("portfolio");
    } else {
      setActiveMenu("homepage");
    }
  };

  const options = {
    rootMargin: "0px",
    threshold: [0.9],
  };

  const observer = useRef();
  const lastCardElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log(entries);
          dispatch({ type: ADD_PAGE });
          dispatch({ type: GET_MEMBERS });
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="phone-container">
        <Navbar />
        <div className="limitation"></div>
        <div className="homepage">
          {visible &&
            visible.map((props, index) => (
              <MemberList
                key={index}
                {...props}
                handler={handler}
                index={index}
                refFunction={lastCardElementRef}
                length={visible.length}
              />
            ))}

          {loading && <h1>hello</h1>}
        </div>
      </div>
    </>
  );
};

export default Homepage;
