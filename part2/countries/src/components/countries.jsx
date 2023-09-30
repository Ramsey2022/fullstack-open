import CountryData from './countryData'

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length === 1) {
    return <CountryData country={countriesToShow[0]} />
  } else if (countriesToShow.length <= 10) {
    return (
      <>
        {countriesToShow.map(country => (
          <div key={country.name.common}>{country.name.common}</div>
        ))}
      </>
    )
  } else if (countriesToShow.length > 10) {
    return <p> Too many matches, specify another filter </p>
  }  
}

export default Countries
