import React, {useState, useEffect} from "react";
import "../styles/style_today_weather.css";
import "../media_screen/media_today_weather.css";
import cloudy_icon from "../images/cloudy.jpg";
import default_img from "../images/default.jpeg";
import mist_icon from "../images/mist.jpeg";
import rainy_icon from "../images/rainy.jpeg";
import snowy_icon from "../images/snowy.jpeg";
import sunny_icon from "../images/sunny.jpeg";
import thunder_icon from "../images/thunder.jpg";
import cloudy_background from "../images/cloudy40.png";
import mist_background from "../images/mist20.png";
import rainy_background from "../images/rainy40.png";
import snowy_background from "../images/snowy40.png";
import sunny_background from "../images/sunny40.png";
import thunder_background from "../images/thunder40.png";


function TodayWeather(props){
    const api_key = "324b72ef272dc0c59fa819841a055f1c";
    const [isLoading, setIsLoading] = useState(true);
    const [themeIcon, setThemeIcon] = useState(default_img);
    const [showDropDown, setShowDropDown] = useState(false);
    const [error, setError] = useState(null);

    function toggleShowDropDown(){
        setShowDropDown(showDropDown => !showDropDown);
    }

    function toggleChooseCity(data){
        props.setWeatherData(data);
        props.setCityName(data.name);
        props.setCountryName(data.sys.country);
        console.log();
        props.setKeyPressDailyForecast(true);
        props.setKeyPressWeeklyForecast(true);
    }

    const handleLocationError = error => {
		switch (error.code) {
		  case error.PERMISSION_DENIED:
			setError("Error: User denied the request for Geolocation.");
			break;
		  case error.POSITION_UNAVAILABLE:
			setError("Error: Location information is unavailable.");
			break;
		  case error.TIMEOUT:
			setError("Error: The request to get user location timed out.");
			break;
		  default:
			setError("Error: An unknown error occurred.");
			break;
		}
		setIsLoading(false);
  };

    useEffect(() =>{
        const dataFetch = async() => {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(async(position) => {
                    const {latitude, longitude} = position.coords;
                    props.setLatitude(latitude);
                    props.setLongitude(longitude);
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`);
                    const data = await response.json();
                    props.setWeatherData(data);
                    props.setCityName(data.name);
                    setIsLoading(false);
                }, handleLocationError);
            } else {
			  setError("Error: Geolocation is not supported by this browser.");
			  setIsLoading(false);
			}
        };
        dataFetch();
    }, [api_key]);

    useEffect(() => {
        if(Object.keys(props.weatherData).length === 0){
            return;
        }
        
        const condition = props.weatherData.weather[0].main.toLowerCase();
        if (condition === 'clear') {
            setThemeIcon(sunny_icon);
            props.setThemeBackground(sunny_background);
        } else if (condition === 'clouds') {
            setThemeIcon(cloudy_icon);
            props.setThemeBackground(cloudy_background);
        } else if (condition === 'rain' || condition === 'drizzle') {
            setThemeIcon(rainy_icon);
            props.setThemeBackground(rainy_background);
        } else if (condition === 'snow') {
            setThemeIcon(snowy_icon);
            props.setThemeBackground(snowy_background);
        } else if (condition === 'thunderstorm') {
            setThemeIcon(thunder_icon);
            props.setThemeBackground(thunder_background);
        }else if (condition === 'mist' || condition === 'fog') {
            setThemeIcon(mist_icon);
            props.setThemeBackground(mist_background);
        }else {
            setThemeIcon(default_img);
            props.setThemeBackground(default_img);
        }
    }, [props.weatherData]);

    const themeIconImage =  `url(${themeIcon})`;
    const styles_icon = {backgroundImage: themeIconImage};
    
    if (isLoading) {
        return <div className="loading-container">Loading..</div>;
    }

    if (error) {
		return <div className="loading-container">{error}</div>;
	}

    if(!props.weatherData){
        return <div>Unable to fetch weather data..</div>
    }

    const handleCityChange = async(e) => {
        if (e.key === "Enter") {
            props.setCityName(e.target.value);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${api_key}&units=metric`);
            const data = await response.json();
            props.setKeyPressDailyForecast(true);
            props.setKeyPressWeeklyForecast(true);
            if(data.cod === 200){
                props.setWeatherData(data);
            }
            else{
                alert("City doesn't exist!");
            }
        }
    };

    const handleFavoriteCities = (object) => {
        if(props.favoriteCitiesList.some((item) => item.name === object.name)){
            props.setFavoriteCitiesList(props.favoriteCitiesList.filter((item) => item.name !== object.name));
        }else{
            props.setFavoriteCitiesList([...props.favoriteCitiesList, object]);
        }
        
    }


    let {name, main, weather, sys} = props.weatherData;
    let {temp} = main;
    let {description, icon} = weather[0];
    let {country} = sys;

    const today = new Date();
    const numberDay = today.getDay();
    const arrayDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];
    const day = arrayDays[numberDay];
    
    const hour = today.getHours();
    let minutes = today.getMinutes();
    if(minutes < 10){
        minutes = "0"+minutes;
    }
    return (
    <div className="today-weather-card">
        <div className="input-container">
            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
            <input id="city-input" type="text" onKeyPress={handleCityChange} onClick={toggleShowDropDown} placeholder="Search for places.." autoComplete="off"></input>
        </div>
        <ul className={"favorite-cities-dropdown " + (showDropDown ? "" : "hidden") }>
            {
                props.favoriteCitiesList.length === 0 ? (<li>No favorite cities..</li>) :
                (props.favoriteCitiesList.map((city, name, sys) => (<li className="favorite-cities-dropdown-element" key={name} onClick={() => toggleChooseCity(city)}>{city.name}, {city.sys.country}</li>)))
            }
        </ul>
        <div className="img-container">
            <img id="todayImg" src = {`http://openweathermap.org/img/w/${icon}.png`} alt={description}/>
        </div>
        <p className="temperature">{temp}<span>°C</span></p>
        <p className="time"><span className="day">{day}, </span> <span className="minutes">{hour}:{minutes}</span></p>
        <hr></hr>
        <div className="under-hr">
            <div className="theme-container" id="style-theme-container" style={styles_icon} >
                {(props.favoriteCitiesList.filter(obj => obj.name === props.weatherData.name).length > 0) ? (<i className={"fa-solid fa-star fa-lg "} onClick={() => handleFavoriteCities(props.weatherData)} />) : (<i className={"fa-regular fa-star fa-lg "} onClick={() => handleFavoriteCities(props.weatherData)}/> )}
                <h2>{name}, {country}</h2>
            </div>
            <p className="description">{description}</p>
        </div>
    </div>);
}

export default TodayWeather;