import React from "react";
import "./style.css";
export function NavBtn(props){
    return (
        <button type="button" class="btn btn-info" onClick={props.goPath}>
        {props.children}
        </button>
    )
}