import React from "react";
import { useCity } from "../context/WeatherContext";

function City() {
  const { city, selectedCity, setSelectedCity } = useCity();
  return (
    <div>
      <select className="select"
        value={selectedCity}
        onChange={(e) =>setSelectedCity(e.target.value)}
      >
        {city.map((one,index) => (
          <option key={index} value={one.il_adi}>{one.il_adi}</option>
        ))}
      </select>
    </div>
  );
}

export default City;
