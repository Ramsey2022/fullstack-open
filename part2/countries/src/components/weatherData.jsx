import { useEffect, useState } from 'react'
import axios from 'axios'


const WeatherData = ({ city }) => {
  const WEATHER_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_KEY}`
    )
    .then(response => {
      setWeather(response.data)
    })
  }, [])

  return (
    <>
      {weather.main ? (
        <div>
          <h3>Weather in {city}</h3>
          <p>Temperature: {weather.main.temp} Celcius</p>
          <img
            alt='weather icon'
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : null}
    </>
  )
}

export default WeatherData