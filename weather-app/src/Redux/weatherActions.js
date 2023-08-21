import axios from 'axios'
import {
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from './actionTypes'

const fetchWeatherStart = () => ({
  type: FETCH_WEATHER_START,
})

const fetchWeatherSuccess = (weather) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weather,
})

const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
})

export const fetchWeather = (city) => {
  return (dispatch) => {
    dispatch(fetchWeatherStart())
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    axios
      .get(url)
      .then((response) => {
        dispatch(fetchWeatherSuccess(response.data))
      })
      .catch((error) => {
        // Enhanced error handling to provide a more user-friendly message
        const errorMsg = error.response
          ? `Failed to fetch weather for ${city}: ${error.response.data.message}`
          : `Failed to fetch weather for ${city}: ${error.message}`
        dispatch(fetchWeatherFailure(errorMsg))
      })
  }
}

export const fetchWeatherByCoordinates = (lat, lon) => {
  return (dispatch) => {
    dispatch(fetchWeatherStart())
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    axios
      .get(url)
      .then((response) => {
        dispatch(fetchWeatherSuccess(response.data))
      })
      .catch((error) => {
        // Enhanced error handling similar to fetchWeather
        const errorMsg = error.response
          ? `Failed to fetch weather for coordinates: ${error.response.data.message}`
          : `Failed to fetch weather for coordinates: ${error.message}`
        dispatch(fetchWeatherFailure(errorMsg))
      })
  }
}
