import React from "react";

export const List = props => {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        {props.children}
      </li>
    </ul>
  );
};