// you can use this code for get the location of you city, use Mozilla FireFox for work

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsSun, BsMoon, BsCloudSun, BsCloudMoon, BsCloudRain, BsCloudRainHeavy, BsCloudLightningRain, BsCloudSnow, BsCloudFog } from 'react-icons/bs';
import './App.css'

function CityWeather() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      const API_KEY = '97d54f6f736bc4d9d7014516da54aa0c';
      const API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      try {
        const response = await axios.get(API_URL);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  let time = null;
  let city = null;
  let temperature = null;
  let weatherIcon = null;

  if (weatherData.dt) {
    time = new Date(weatherData.dt * 1000).toLocaleTimeString().slice(0, 5);
    city = weatherData.name;
    temperature = (weatherData.main.temp - 273.15).toFixed(0);

    const { id } = weatherData.weather[0];
    if (id >= 200 && id <= 232) {
      weatherIcon = <BsCloudLightningRain className='icon' />;
    } else if (id >= 300 && id <= 321) {
      weatherIcon = <BsCloudRain className='icon' />;
    } else if (id >= 500 && id <= 531) {
      weatherIcon = <BsCloudRainHeavy className='icon' />;
    } else if (id >= 600 && id <= 622) {
      weatherIcon = <BsCloudSnow className='icon' />;
    } else if (id >= 700 && id <= 781) {
      weatherIcon = <BsCloudFog className='icon' />;
    } else if (id >= 801 && id <= 804) {
      const currentHour = new Date().getHours();
      weatherIcon = currentHour >= 6 && currentHour <= 18 ? (
        <BsCloudSun className='icon' />
      ) : (
        <BsCloudMoon className='icon' />
      );
    } else if (id === 800) {
      const currentHour = new Date().getHours();
      weatherIcon = currentHour >= 6 && currentHour <= 18 ? (
        <BsSun className='icon' />
      ) : (
        <BsMoon className='icon' />
      );
    }
  }

  return (
    <div className='app'>
      <h1>WEATHER SITE</h1>
      {city ? (
        <>
          <h2>
            {city}, {time}
          </h2>
          <h3>
            {temperature}??C
          </h3>
          <div className='icon'>
            {weatherIcon}
          </div>
        </>
      ) : (
        <><h4>to see the weather of your city, please allow access to your location in your browser, maybe you browser,
            block the access, allowed that for site can work, thank you</h4>
            <h4>If Google Chrome don't work, use Mozilla FireFox</h4></>
      )}
    </div>
  );
}

export default CityWeather;