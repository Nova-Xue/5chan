import React from "react";
import "./style.css";
export function Row (props){
  
  return (
    <div className="row rounded">
      {props.children}
    </div>
  )
}
export function Col (props){
  return (
    <div className={"col col-"+props.grid}>
      {props.children}
    </div>
  )
}