import React, {useState, useEffect} from "react";

import "../styles/style_forecast.css";
import "../styles/style_day_forecast.css";
import "../media_screen/media_forecast.css";

function ForecastWeek(props){
    const api_key = "324b72ef272dc0c59fa819841a055f1c";
    useEffect(() => {
        const fetchForecastWeek = async () => {
            try{
                if(props.keyPressWeeklyForecast === true){
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.cityName}&appid=${api_key}&units=metric`);
                    const data = await response.json();

                    props.setWeeklyForecast(data.list);
                    props.setKeyPressWeeklyForecast(false);
                }else{
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${props.latitude}&lon=${props.longitude}&appid=${api_key}&units=metric`);
                    const data = await response.json();

                    props.setWeeklyForecast(data.list);
                }
            }catch(error){
                console.error(error)
            }
        }
        fetchForecastWeek();
    }, [props.cityName]);

    useEffect(() => {
        if(!props.weeklyForecast || !Array.isArray(props.weeklyForecast)){
            return;
        }

        const filteredData = props.weeklyForecast.filter((weather) => {
            const today = new Date();
            const currentDay = today.toLocaleDateString();
            const numberOfDaysToAdd = 5;
            const dateAfterFiveDays = new Date(today.setDate(today.getDate() + numberOfDaysToAdd)).toLocaleDateString();
            const weatherDate = new Date(weather.dt_txt).toLocaleDateString();
        
            return currentDay < weatherDate && weatherDate < dateAfterFiveDays;
        });
        
        const temperatureData = filteredData.reduce((result, { dt_txt, main, weather }) => {
            const date = dt_txt.split(" ")[0];
            const time = dt_txt.split(" ")[1];
            const temperature = main.temp;
            const image = weather[0].icon;
            const description = weather[0].description;

            if (!result[date]) {
                result[date] = { min: temperature, max: temperature, image: image, description: description };
            } else {
                if (temperature < result[date].min) {
                    result[date].min = temperature;
                }
                if (temperature > result[date].max) {
                    result[date].max = temperature;
                }
                if(time === "15:00:00"){
                    result[date].image = image;
                    result[date].description = description;
                }
        }
        return result;
        }, {});

        props.setWeeklyForecast(temperatureData);

        const weeklyCard = [];
        Object.keys(temperatureData).forEach((dateString, index) => {
            const dayCard = temperatureData[dateString];
            weeklyCard.push(
                <div key={index} className="card-container">
                    <div className="img-container">
                        <img className = "img-card" src={`http://openweathermap.org/img/w/${dayCard.image}.png`}></img>
                </div>
                <div className="temp-min-max-container">
                    <p className = "temp-card min">{dayCard.min} <span>°C</span></p>
                    <p className = "temp-card max">{dayCard.max} <span>°C</span></p>
                </div>
                <p className = "date-card">{new Date(dateString).toLocaleDateString("en-US", {weekday: 'long'})}</p>
                <hr />
                <p className = "description-card">{dayCard.description}</p>
          </div>
        );
        props.setWeeklyCard(weeklyCard);
    });

    }, [props.weeklyForecast]);
    
    return (<div className={"card-list " + (props.tabSwitch ? "" : "unavailable")}>
        {props.weeklyCard}
    </div>);
}

export default ForecastWeek;
