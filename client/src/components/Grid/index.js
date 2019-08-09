import React from "react";

export function Row ({children}){
  return (
    <div className="row">
      {children}
    </div>
  )
}
export function Col (props){
  return (
    <div className={"col-"+props.grid}>
      {props.children}
    </div>
  )
}