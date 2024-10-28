import Country from './Country'

const Countries = ({ countries, setSelectedCountry }) => {
  return (
    <div>
      {countries.length > 10
        ? 'Too many matches, specify another filter'
        : countries.length === 1
        ? <Country country={countries[0]} />
        : countries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>show</button>
            </div>
        ))}
    </div>
  )
}

export default Countries
