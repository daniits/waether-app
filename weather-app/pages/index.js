import React, { useEffect, useState } from 'react'

import { BsSearch } from 'react-icons/bs'
import axios from 'axios'
import Image from 'next/image'
import Meta from '../src/Components/Header/Meta'
import WeatherDetails from '../src/Components/Card/WeatherDetails'
import Sipner from '../src/Components/Spinner'

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  const fetchWeatherByCoordinates = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    axios
      .get(url)
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => {
        setError('Error fetching weather data. Please try again.')
        console.log(error)
      })
  }

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeatherByCoordinates(position.coords.latitude, position.coords.longitude)
      })
    } else {
      setError('Geolocation is not supported by this browser.')
    }
  }

  useEffect(() => {
    fetchUserLocation()
  }, [])

  const fetchWeather = (e) => {
    e.preventDefault()
    setLoader(true)
    setLoading(true)
    setError('')

    axios
      .get(url)
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => {
        setError('Error fetching weather data. Please try again.')
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        setCity('')
        setLoader(false)
      })
  }
  if (loader) {
    return <Sipner />
  } else {
    return (
      <div>
        <Meta />
        {/* {Overlay} */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
        {/* {Background Image} */}
        <Image
          src={
            'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
          }
          alt="Weather Description Image"
          layout="fill"
          className="object-cover"
        />
        {/* {Search} */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10 ">
          <form
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
            onSubmit={fetchWeather}
          >
            <div>
              <input
                className="bg-transparent border-none text-white focus:outline-none text-2xl placeholder:text-white"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : <BsSearch size={20} />}
            </button>
          </form>
        </div>
        {error && <p>{error}</p>}

        {/* {Weather} */}

        {weather.main && <WeatherDetails data={weather} />}
      </div>
    )
  }
}
