import React from 'react'
import CCountry from './CCountry'

const CCountries = ({countries}) => {
    return(
        <>
            {countries.map(country => <CCountry key={country.name.common} name={country.name.common} country={country}/>)}   
        </>
    )
}

export default CCountries
