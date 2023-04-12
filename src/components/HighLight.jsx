import React from "react";
import WindInfo from "./highlight-components/WindInfo";
import "../styles/style_highlight.css";
import SunriseSunset from "./highlight-components/SunriseSunset";
import Humidity from "./highlight-components/Humidity";
import Pressure from "./highlight-components/Pressure";
import "../media_screen/media_highlight.css";

export default function HighLight(props){
    let {name, main, weather, sys, wind} = props.weatherData;
    let {temp, humidity, pressure} = main;
    let {description, icon} = weather[0];
    let {country, sunrise, sunset} = sys;

    return (
        <div className="hightlight-list">
            <div className="hightlight-container">
                <WindInfo 
                wind = {wind}
            />
            </div>

            <div className="hightlight-container">
                <Humidity
                humidity = {humidity}
            />
            </div>

            <div className="hightlight-container">
                <Pressure
                pressure = {pressure}
            />
            </div>
            <div className="hightlight-container sunset-sunrise">
                <SunriseSunset
                sunrise = {sunrise}
                sunset = {sunset}
                />
            </div>
        </div>
    );
}