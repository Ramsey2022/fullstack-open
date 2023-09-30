import { useState } from 'react'
import CountryData from './countryData'

const Countries = ({ countriesToShow }) => {
  const [country, setCountry] = useState('')

  if (countriesToShow.length === 1) {
    return <CountryData country={countriesToShow[0]} />
  } else if (countriesToShow.length <= 10) {
    return (
      <>
        {countriesToShow.map(country => (
          <div key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => setCountry(country)}>show</button>
            </div>
        ))}
        {country ? <CountryData country={country} /> : null}
      </>
    )
  } else if (countriesToShow.length > 10) {
    return <p> Too many matches, specify another filter </p>
  }  
}

export default Countries
