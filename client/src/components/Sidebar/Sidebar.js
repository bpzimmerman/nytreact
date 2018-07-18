import React from "react";
import './Sidebar.css';

const Sidebar = ({ children }) => (
  <div>
    <nav id="sidebar" className="bg-light">
      {children}
    </nav>
  </div>
);

export default Sidebar;