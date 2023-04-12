import React from "react";

export default function Pressure(props){
    return (
        <div className="pressure-container">
            <div className="pressure-status">
                <i className="fa-solid fa-gauge fa-2xl"></i>
                <p className="status">Pressure</p>
            </div>
            
            <p className="pressure">{props.pressure}<span>hPa</span></p>
        </div>
        
    );
}