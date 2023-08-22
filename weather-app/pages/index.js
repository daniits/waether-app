import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import Image from 'next/image'
import Meta from '../src/Components/Header/Meta'
import WeatherDetails from '../src/Components/Card/WeatherDetails'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather } from '../src/Redux/weatherActions'
import { fetchWeatherByCoordinates as fetchWeatherByCoordinatesAction } from '../src/Redux/weatherActions'
import BackgroundImage from '../src/Components/BackgroundImage'
import SearchForm from '../src/Components/SearchForm'

export default function Home() {
  const [city, setCity] = useState('')
  const [geoError, setGeoError] = useState(null);
  const { weather, loading, error } = useSelector((state) => state.weather)
  const dispatch = useDispatch()

  // Function to dispatch fetch weather by coordinates action
  const fetchWeatherByCoordinates = (lat, lon) => {
    dispatch(fetchWeatherByCoordinatesAction(lat, lon))
  }


  

  // Function to fetch user's current location
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeatherByCoordinates(
          position.coords.latitude,
          position.coords.longitude,
        );
      });
    } else {
      setGeoError('Geolocation is not supported by this browser.');
    }
  };
  

  // Fetch user location on component mount
  useEffect(() => {
    fetchUserLocation()
  }, [])

  // Function to handle weather search by city
  const fetchWeatherData = (e) => {
    e.preventDefault()
    dispatch(fetchWeather(city))
    setCity('')
  }

  return (
    <div>
      <Meta />
      <BackgroundImage />
      <SearchForm
        city={city}
        setCity={setCity}
        loading={loading}
        fetchWeatherData={fetchWeatherData}
      />
      <div className='relative w-[100%] justify-center flex text-2xl text-red-500 mt-2'>
      {error && <p>{error}</p>}
      {geoError && <p>{geoError}</p>}
      </div>
      {weather.main && <WeatherDetails data={weather} />}
    </div>
  )
}
