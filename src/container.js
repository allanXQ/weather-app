import { useState } from "react";
import axios from "axios";

import Search from "./components/search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import CurrentWeather from "./components/current";
import Forecast from "./components/forecast";

export default function Container() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setcity] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setcity(searchData.label);
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lon);
    axios
      .get(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
      )
      .then((res) => {
        setCurrentWeather({ city: searchData.label, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
      )
      .then((res) => {
        setForecast({ city: searchData.label, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-2 pt-5 px-2 min-h-screen  min-w-full sm:min-w-[70vw]  bg-slate-600 justify-center">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} city={city.slice(0, -4)} />}
      </div>
    </div>
  );
}
