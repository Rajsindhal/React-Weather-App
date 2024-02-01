import React, { useEffect, useState } from 'react'
import './Style.css'
import WeatherCard from './WeatherCard'

const Temp = () => {

    const [searchValue, setSearchValue] = useState('junagadh')
    const [tempInfo, setTempInfo] = useState({})

    const getWhetherInfo = async() => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7ea2352f5844f9f11ed131940ab9a2c7`

            let res = await fetch(url)
            let data = await res.json()
            console.log(data)

            const {temp, humidity, pressure} = data.main
            const {main: weathermood} = data.weather[0]
            const {name} = data 
            const { speed } = data.wind
            const {country, sunset} = data.sys

            const newWeather = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            }

            setTempInfo(newWeather);

        }catch(error) {
            console.log(error)
        }


    }

    useEffect(() => {
        getWhetherInfo();
    },[])

  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input type='search' placeholder='search here...' autoFocus id='search' className='searchTerm'
            value={searchValue} onChange={e => setSearchValue(e.target.value)} />
            <button className='searchButton' onClick={getWhetherInfo}>search</button>
        </div>
      </div>

      {/* for Weathercard  */}

      <WeatherCard tempInfo={tempInfo} />
      
    </>
  )
}

export default Temp
