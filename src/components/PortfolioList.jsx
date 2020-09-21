import React, { useState } from "react";

const PortfolioList = (props) => {
  const { src, alt } = props;
  return (
    <>
      <div className="card">
        <img src={src} alt={alt} />
      </div>
    </>
  );
};

export default PortfolioList;
