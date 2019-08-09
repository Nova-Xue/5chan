import React from "react";

export function Nav({children}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {children}
    </nav>
  );
};

export function NavItemLeft(props){
  return (
    <a className="navbar-brand" href={props.link}>
      {props.text}
    </a>
  )
};

export function NavItemRight(props){
  return (
    <a className="navbar-brand" href={props.link}>
      {props.text}
    </a>
  )
};