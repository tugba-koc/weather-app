import axios from "axios";
import React, { useEffect } from "react";
import { useCity } from "../context/WeatherContext";
import sun from "../images/sun.png";
import brokenclouds from "../images/brokenclouds.png";
import scatteredclouds from "../images/scatteredclouds.png";
import lightrain from "../images/lightrain.png";
import fewclouds from "../images/fewclouds.png";
import { usePosition } from "use-position";

function Weather() {
  const { city, selectedCity, setWeather, weather, setSelectedCity } =
    useCity();
  const {
    latitude,
    longitude,
    // error
  } = usePosition();

  useEffect(
    () => {
      let i;
      for (i in city) {
        if (
          Math.floor(city[i].lat) === Math.floor(latitude) &&
          Math.floor(city[i].lon) === Math.floor(longitude)
        ) {
          setSelectedCity(city[i].il_adi);
        }
      }
      console.log(city[i])
    },

    
    [city, latitude, longitude, setSelectedCity]
  );

  useEffect(() => {
    // secilen city ile json dosyasi eslestirildi.
    const getWeather = (selectedCity) => {
      let i;
      for (i in city) {
        if (city[i].il_adi === selectedCity) {
          axios(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${city[i].lat}&lon=${city[i].lon}&units=metric&exclude=minutely&appid=ad90dc5bb9e93f4b94b3ee03adccde5f`
          ).then((res) => setWeather(res.data.daily));
        }
      }
    };
    getWeather(selectedCity);
  }, [city, selectedCity, setWeather]);

  const DAYS = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

  // image icin switch-case olusturuldu.
  let image;
  function imageFunc(x) {
    switch (x) {
      case "clear sky":
        image = <img className="weather-icon" src={sun} alt="clear sky" />;
        break;
      case "broken clouds":
        image = (
          <img className="weather-icon" src={brokenclouds} alt="wefwef" />
        );
        break;

      case "scattered clouds":
        image = (
          <img
            className="weather-icon"
            src={scatteredclouds}
            alt="scattered clouds"
          />
        );
        break;

      case "light rain":
        image = (
          <img className="weather-icon" src={lightrain} alt="light rain" />
        );
        break;

      case "few clouds":
        image = (
          <img className="weather-icon" src={fewclouds} alt="few clouds" />
        );
        break;

      default:
        break;
    }
  }

  return (
    <div className="container">
      {weather.map((weat, index) => (
        <div
          className={`${index + 3 === new Date().getDay() && "border"} day`}
          key={index}
        >
          {/* get days */}
          <div className="day-name">{DAYS[index]}</div>

          {/* get images */}
          {weat.weather[0].description &&
            imageFunc(weat.weather[0].description)}
          {image}

          {/* get weather temp. */}
          <div className="italic">
            {weat.temp.max}° <span className="light">{weat.temp.min}°</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Weather;
