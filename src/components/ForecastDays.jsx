import React, { useEffect } from "react";
import "../styles/style_day_forecast.css";
import "../styles/style_forecast.css";
import "../media_screen/media_day_forecast.css";
import "../media_screen/media_forecast.css";

function ForecastDays(props){
    const api_key = "324b72ef272dc0c59fa819841a055f1c";
    let fiveHoursForecast = [];
    
    useEffect(() => {
        const fetchForecastDay = async (e) => {
            try{
                
                if(props.keyPressDailyForecast === true){
                    let response;
                    if(props.countryName !== ""){
                        response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.cityName},${props.countryName}&appid=${api_key}&units=metric`);
                        props.setCountryName("");
                    }else{
                        response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.cityName}&appid=${api_key}&units=metric`);
                    }
                    const data = await response.json();
                    let count=0;
                    
                    while(count < 4){
                        fiveHoursForecast.push(data.list[count]);
                        count++;
                    }
                    props.setDailyForecast(fiveHoursForecast);
                    props.setKeyPressDailyForecast(false);
                }else{
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${props.latitude}&lon=${props.longitude}&appid=${api_key}&units=metric`);
                    const data = await response.json();
                    let count=0;
                    
                    while(count < 4){
                        fiveHoursForecast.push(data.list[count]);
                        count++;
                    }
                    props.setDailyForecast(fiveHoursForecast);
                }
            }catch(error){
                console.error(error)
            }
        }
        fetchForecastDay();
    }, [props.cityName])

    const results = [];
    props.dailyForecast.forEach((hourCard, index) => {
        results.push(
          <div key={index} className="card-container">
            <div className="img-container">
                <img className = "img-card" src={`http://openweathermap.org/img/w/${hourCard.weather[0].icon}.png`}></img>
            </div>
            <p className = "temp-card">{hourCard.main.temp} <span>°C</span></p>
            <p className = "date-card"><span className="day">{new Date(hourCard.dt * 1000).toLocaleDateString("en-US",{weekday: 'long'})}</span>, <span className="time">{new Date(hourCard.dt * 1000).getHours() + ":00"}</span></p>
            <hr />
            <p className = "description-card">{hourCard.weather[0].description}</p>
          </div>,
        );
    });
    return (
        <div className={"card-list " + (props.tabSwitch ? "unavailable" : "")}>
            {results}
        </div>   
    );
}

export default ForecastDays;