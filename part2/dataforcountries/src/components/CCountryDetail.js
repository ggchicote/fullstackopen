import React from "react";
import CLanguages from './CLanguages'
import CWeather from './CWeather.js'

const CCountryDetail = ({ country }) => {
  return <>
    <h2>{country.name.common}</h2>
    capital: {country.capital[0]} <br />
    population: {country.population}
    <h3>languages</h3>
    <CLanguages languages={country.languages} />
    <img src={country.flags.png} alt={country.name.common} />
    <CWeather capital={country.capital[0]}/>
  </>;
};

export default CCountryDetail;
