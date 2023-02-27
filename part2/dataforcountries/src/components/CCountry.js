import React, {useState} from 'react'
import CCountryDetail from './CCountryDetail'


const CCountry = ({name, country}) => {

    const [showDetail, setShowDetail] = useState(false)

    return <>
        {name} 
        <button onClick={()=> setShowDetail(true)}>show</button>
        {showDetail ?
            <CCountryDetail country={country}/> :
            null
        }
        <br />
    </>
}

export default CCountry