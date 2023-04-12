import React from "react";
import "../../styles/style_highlight.css";
export default function WindInfo(props){
    return (
        <div className="wind-container">
            <div className="wind-status">
                <i className="fa-solid fa-wind fa-2xl"></i>
                <p className="status">Wind Status</p>
            </div>
            
            <p className="wind-speed">{props.wind.speed}<span>km/h</span></p>
        </div>
        
    );
}