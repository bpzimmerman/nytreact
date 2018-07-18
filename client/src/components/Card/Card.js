import React from "react";

const Card = ({ section, children }) => (
  <div className={section}>
    {children}
  </div>
);

export default Card;