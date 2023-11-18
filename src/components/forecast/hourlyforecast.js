import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HourlyForecast() {
  const [weather, setweather] = useState({
    time: [],
    temperature: [],
    humidity: [],
    feelslike: [],
    windspeed: [],
    cloudcover: [],
  });

  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");
  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=pressure_msl&hourly=weathercode&hourly=temperature_2m&hourly=apparent_temperature&hourly=relativehumidity_2m&hourly=windspeed_10m&hourly=cloudcover`,
      )
      .then((res) => {
        const response = res.data.hourly;
        setweather({
          time: response.time,
          temperature: response.temperature_2m,
          humidity: response.relativehumidity_2m,
          feelslike: response.apparent_temperature,
          windspeed: response.windspeed_10m,
          cloudcover: response.cloudcover,
          pressure: response.pressure_msl,
          weathercode: response.weathercode,
        });
      });
  }, []);

  const { time } = weather;
  const date = new Date();
  const { city, day } = useParams();

  return (
    <div className="text-white flex flex-col items-center">
      <div className="w-screen flex flex-col py-5 bg-slate-600 sm:max-w-[90vw] items-center">
        <p className="flex font-bold text-lg pb-5">
          {city}, {day}
        </p>
        <div className=" grid sm:grid-cols-2 gap-5 ">
          {time.map((hour) => {
            const datetime = hour.split("T");
            const datearr = datetime[0].split("-");
            if (parseInt(datearr[2], 10) === parseInt(date.getDate(), 10)) {
              return (
                <div
                  key={datetime[1]}
                  className="bg-black mx-2 text-white p-2 m-0 rounded-md min-w-[95vw] sm:min-w-[40vw]"
                >
                  <p>{datetime[1]}</p>
                  <div
                    className="grid 
              grid-cols-2 gap-2  justify-items-center font-medium"
                  >
                    <p>
                      Temperature:
                      {Math.round(
                        weather.temperature.at(weather.time.indexOf(hour)),
                      )}
                    </p>
                    <p>
                      Feels like:
                      {Math.round(
                        weather.temperature.at(weather.time.indexOf(hour)),
                      )}
                    </p>
                    <p>
                      Humidity:
                      {Math.round(
                        weather.humidity.at(weather.time.indexOf(hour)),
                      )}
                    </p>
                    <p>
                      Wind Speed:
                      {Math.round(
                        weather.windspeed.at(weather.time.indexOf(hour)),
                      )}
                    </p>
                    <p>
                      Cloud Cover:
                      {Math.round(
                        weather.cloudcover.at(weather.time.indexOf(hour)),
                      )}
                    </p>
                    <p>
                      Pressure:
                      {Math.round(
                        weather.pressure.at(weather.time.indexOf(hour)),
                      )}
                    </p>
                  </div>
                </div>
              );
            }
            return "";
          })}
        </div>
      </div>
    </div>
  );
}
