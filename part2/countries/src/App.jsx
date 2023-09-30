import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/countries'

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then( response => {
      setCountries(response.data)
    })
  }, [])

  const handleValueChange = e => {
    const search = e.target.value
    setValue(search)
    setCountriesToShow(
      countries.filter(country => 
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  return (
    <>
      <div>
        Find Countries <input 
        value={value}
        onChange={handleValueChange} /> 
      </div>
      <Countries countriesToShow={countriesToShow} />
    </>
  )
}

export default App
