import React from "react";

export default function SunriseSunset(props){
    const sunrise = new Date(props.sunrise * 1000).toLocaleTimeString();
    const formatSunrise = sunrise.substring(0, sunrise.lastIndexOf(":"));
    const sunset = new Date(props.sunset * 1000).toLocaleTimeString();
    const formatSunset = sunset.substring(0, sunset.lastIndexOf(":"));
    return (<div className="sun-info-container">
       <p className="status">Sunrise & Sunset</p>
        <div className="sunrise-info">
            <i className="fa-solid fa-sun fa-2xl"><i className="fa-solid fa-arrow-up fa-2xs"></i></i>
            <p className="sunrise">{formatSunrise}</p>
        </div>
        
        <div className="sunset-info">
            <i className="fa-solid fa-sun fa-2xl"><i className="fa-solid fa-arrow-down fa-2xs"></i> </i>
            <p className="sunset">{formatSunset}</p>
        </div>
        
        {/* <p>Feels Like</p> */}
    </div>);
}