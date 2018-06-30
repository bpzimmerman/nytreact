import React from "react";
import './Sidebar.css';

const Sidebar = ({ children }) => (
  <div>
    <nav id="sidebar" className="bg-light">
      <div className="sidebar-header">
        <h3>Article Search</h3>
      </div>
      {children}
    </nav>
  </div>
);

export default Sidebar;