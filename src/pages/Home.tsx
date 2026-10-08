import { useEffect, useState } from 'react'
import type { City, WeatherResponse } from '../types'
import { addToHistory } from '../history'

const CITIES_URL =
  'https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=2000'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function Home() {
  const [cities, setCities] = useState<City[]>([])
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [showList, setShowList] = useState(false)

  const query = search.trim().toLowerCase()
  const filteredCities = query
    ? cities.filter(
        (c) => c.city_name_he.includes(query) || c.city_name_en.toLowerCase().includes(query),
      )
    : []

  useEffect(() => {
    fetch(CITIES_URL)
      .then((res) => res.json())
      .then((data) => {
        const records: City[] = data.result.records
        const list = records
          .map((c) => ({
            ...c,
            city_name_he: c.city_name_he.trim(),
            city_name_en: c.city_name_en.trim(),
          }))
          .filter((c) => c.city_name_en !== '')
          .sort((a, b) => a.city_name_he.localeCompare(b.city_name_he, 'he'))
        setCities(list)
      })
      .catch(() => setError('Failed to load the list of localities'))
  }, [])

  async function selectCity(city: City) {
    const cityHe = city.city_name_he
    const cityEn = city.city_name_en

    setSearch(cityHe)
    setShowList(false)
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(cityEn)}`,
      )
      if (!res.ok) throw new Error()

      const data: WeatherResponse = await res.json()
      setWeather(data)

      addToHistory({
        cityHe,
        cityEn,
        tempC: data.current.temp_c,
        condition: data.current.condition.text,
        date: new Date().toLocaleString('en-GB'),
      })
    } catch {
      setError(`No weather data found for "${cityEn}"`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Current Weather</h2>

      <div className="search">
        <input
          type="text"
          placeholder="Search a locality..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setShowList(true)
          }}
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
        />

        {showList && query && (
          <ul className="suggestions">
            {filteredCities.length === 0 ? (
              <li className="empty">No localities found</li>
            ) : (
              filteredCities.map((city) => (
                <li key={city._id} onMouseDown={() => selectCity(city)}>
                  {city.city_name_he} ({city.city_name_en})
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h3>
            {weather.location.name}, {weather.location.country}
          </h3>
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
          <p className="temp">{weather.current.temp_c}°C</p>
          <p>{weather.current.condition.text}</p>
          <p>Feels like: {weather.current.feelslike_c}°C</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_kph} km/h</p>
          <p>Local time: {weather.location.localtime}</p>
        </div>
      )}
    </div>
  )
}

export default Home
