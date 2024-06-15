import axios from "axios";
import { useEffect, useState } from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherInfo(response.data);
      });
  }, []);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <p>
        <strong>languages:</strong>
      </p>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      <Weather weatherInfo={weatherInfo} />
    </div>
  );
};

export default Country;
