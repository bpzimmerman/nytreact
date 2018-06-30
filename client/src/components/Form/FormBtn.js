import React from "react";

export const FormBtn = props => (
  <button type="submit" {...props} className="btn btn-primary">
    {props.children}
  </button>
);