import React from 'react'
import { BsSearch } from 'react-icons/bs'

const SearchForm = ({ city, setCity, loading, fetchWeatherData }) => (
  <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10 ">
    <form
      className="relative flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
      onSubmit={fetchWeatherData}
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
      <button className='absolute right-[10px]' type="submit" disabled={loading}>
        {loading ? 'Loading...' : <BsSearch size={20} />}
      </button>
    </form>
  </div>
)

export default SearchForm
