import { useState, useEffect } from 'react'
import Search from './components/Search'
import Countries from './components/Countries'
import countriesService from './services/countries'
import Country from './components/Country'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesService.getAll().then((data) => {
      setCountries(data)
    })
  }, [search])

  useEffect(() => {
    setFilteredCountries(countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  const [selectedCountry, setSelectedCountry] = useState(null)

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <Countries countries={filteredCountries} setSelectedCountry={setSelectedCountry} />
      {selectedCountry && <Country country={selectedCountry} />}
    </div>
  )
}

export default App
