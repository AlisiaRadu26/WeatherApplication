import React, {useState, useEffect} from "react";
import TodayWeather from "./TodayWeather";
import ForecastDays from "./ForecastDays";
import ForecastWeek from "./ForecastWeek";
import Tabs from "./Tabs";
import HighLight from "./HighLight";
import default_img from "../images/default.jpeg";

import "../styles/style_app.css";
import "../styles/style_highlight.css";
import "../media_screen/media_app.css";

function App(){
    const [cityName, setCityName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [weeklyForecast, setWeeklyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [tabSwitch, setTabSwitch] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [weeklyCard, setWeeklyCard] = useState([]);
    const [keyPressDailyForecast, setKeyPressDailyForecast] = useState(false);
    const [keyPressWeeklyForecast, setKeyPressWeeklyForecast] = useState(false);
    const [favoriteCity, setFavoriteCity] = useState(false);
    const [favoriteCitiesList, setFavoriteCitiesList] = useState([]);
    const [themeBackground, setThemeBackground] = useState(default_img);
    const api_key = "324b72ef272dc0c59fa819841a055f1c";

    function toggleTabSwitch(){
        setTabSwitch(tabSwitch => !tabSwitch)
    }

    function toggleFavoriteCity(){
        setFavoriteCity(favoriteCity => !favoriteCity)
    }
    
    return (

        <div className="App">
            <div className="left-side-app">
                <TodayWeather 
                setCityName = {setCityName}
                setCountryName = {setCountryName}

                weatherData = {weatherData}
                setWeatherData = {setWeatherData}

                latitude = {latitude}
                setLatitude = {setLatitude}

                longitude = {longitude}
                setLongitude = {setLongitude}

                keyPressWeeklyForecast = {keyPressWeeklyForecast}
                keyPressDailyForecast = {keyPressWeeklyForecast}

                setKeyPressWeeklyForecast = {setKeyPressWeeklyForecast}
                setKeyPressDailyForecast = {setKeyPressDailyForecast}

                favoriteCity = {favoriteCity}
                setFavoriteCity = {setFavoriteCity}
                toggleFavoriteCity = {toggleFavoriteCity} 

                favoriteCitiesList = {favoriteCitiesList}
                setFavoriteCitiesList = {setFavoriteCitiesList}

                themeBackground = {themeBackground}
                setThemeBackground = {setThemeBackground}
            />
            </div>
            <div className="right-side-app" style={{backgroundImage: `url(${themeBackground})`}}>
                <Tabs 
                    tabSwitch = {tabSwitch}
                    toggleTabSwitch = {toggleTabSwitch}
                />
                {Object.keys(weatherData).length > 0 ? 
                    (<ForecastDays 
                    cityName = {cityName}
                    countryName = {countryName}
                    setCountryName = {setCountryName}

                    tabSwitch = {tabSwitch}

                    dailyForecast = {dailyForecast}
                    setDailyForecast = {setDailyForecast}

                    latitude = {latitude}
                    setLatitude = {setLatitude}

                    longitude = {longitude}
                    setLongitude = {setLongitude}

                    keyPressDailyForecast = {keyPressDailyForecast}
                    setKeyPressDailyForecast = {setKeyPressDailyForecast}
                />
                    ) 
                    : (<p className="loading-container">Loading..</p>)
                }
                {Object.keys(weatherData).length > 0 ? 
                    (
                    <ForecastWeek 
                        cityName = {cityName}
                        countryName = {countryName}
                        setCountryName = {setCountryName}

                        tabSwitch = {tabSwitch}

                        weeklyForecast = {weeklyForecast}
                        setWeeklyForecast = {setWeeklyForecast}

                        latitude = {latitude}
                        setLatitude = {setLatitude}

                        longitude = {longitude}
                        setLongitude = {setLongitude}

                        weeklyCard = {weeklyCard}
                        setWeeklyCard = {setWeeklyCard}

                        keyPressWeeklyForecast = {keyPressWeeklyForecast}
                        setKeyPressWeeklyForecast = {setKeyPressWeeklyForecast}
                    />
                    ) 
                    : (<p className="loading-container">Loading..</p>)
                }
                <h3 className="title-highlights">Today's HighLights</h3>
                {Object.keys(weatherData).length > 0 ? 
                    (<HighLight 
                        weatherData = {weatherData}/>
                    ) 
                    : (<p className= "loading-container">Loading..</p>)
                }
                
            </div>
        </div>
    );
}
export default App;