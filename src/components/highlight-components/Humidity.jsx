import React from "react";
import VerticalPercentageBar from "./VerticalPercentageBar";

export default function Humidity(props){
    return (
        <div className="humidity-container">
             <div className="humidity-status">
                <div className="water-drop">
                    <i className="fa-solid fa-water fa-2xl"></i>
                    <i className="fa-solid fa-droplet"></i>
                </div>
                <span className="status">Humidity</span>
             </div>
             
             <div className="humidity-percentage">
                <p className="humidity">{props.humidity}<span>%</span></p>
                <VerticalPercentageBar 
                    humidity = {props.humidity}
                />
             </div>
             
        </div>
       
    );
}