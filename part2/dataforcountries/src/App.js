import axios from 'axios'
import React, {useEffect, useState} from 'react'
import CFindCountries from './components/CFindCountries'
import CCountries from './components/CCountries'
import CCountryDetail from './components/CCountryDetail'
const App = () => {

  const [countries, setCountries] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = 
    (countriesFiltered === "") ?
    [] :
    countries.filter(country => country.name.common.toLowerCase().includes(countriesFiltered.toLocaleLowerCase()))

  const handleFilterInput = (event) => setCountriesFiltered(event.target.value)

  const handleAmountCountries = () => {
    const count = countriesToShow.length
    if (count > 1 && count < 10) return (<CCountries countries={countriesToShow}/>)
    else if (count === 1) return (<CCountryDetail country={countriesToShow[0]}/>)
    else if (count > 10) return ('Too many matches, specify another filter')
  }

  return (
    <div>
      <CFindCountries value={countriesFiltered} onChange={handleFilterInput}/>
      <div>
        {handleAmountCountries()}
      </div>
    </div>
  )
}

export default App;
