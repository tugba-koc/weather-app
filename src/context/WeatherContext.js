import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState([]);
  const [weather, setWeather] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  useEffect(() => {
    axios("data.json").then((res) => setCity(res.data));
  }, []);
  const values = {
    city,
    setCity,
    selectedCity,
    setSelectedCity,
    weather,
    setWeather
  };
  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useCity = () => useContext(WeatherContext);
