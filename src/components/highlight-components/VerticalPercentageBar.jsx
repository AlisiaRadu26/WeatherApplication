import React from "react";
import "../../styles/style_vertical_percentage_bar.css";

export default function VerticalPercentageBar(props){
    const percentStyle = {
        height: `${props.humidity}%`
    };
    return (
        <div className="vertical-percentage-bar-container">
            <div className="vertical-percentage-bar" style={percentStyle}></div>
        </div>
    );
}