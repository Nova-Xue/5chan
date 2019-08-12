import React from "react";
import "./style.css";
export function Nav({children}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      {children}
    </nav>
  );
};