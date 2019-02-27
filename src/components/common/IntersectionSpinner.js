//IntersectionSpinner

import React from "react";

export default () => {
  return (
    <div id="container">
      <div id="mover" className="dot" />
      <div id="origin" className="dot" />
      <div id="left" className="circle" />
      <div id="right" className="circle" />
    </div>
  );
};
