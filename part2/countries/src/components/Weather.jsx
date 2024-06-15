const Weather = ({ weatherInfo }) => {
  if (weatherInfo) {
    return (
      <div>
        <p>temperature {weatherInfo.main.temp} Celcius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          alt={weatherInfo.weather.description}
        />
        <p>wind {weatherInfo.wind.speed} m/s</p>
      </div>
    );
  }
};

export default Weather;
