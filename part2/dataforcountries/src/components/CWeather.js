import React,{useState, useEffect} from 'react'
import axios from 'axios'

const CWeather = ({capital}) => {

    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`

    const [weatherInfo, setWeatherInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setWeatherInfo(response.data)
                setIsLoading(false)
            })
    }, [])

    return (isLoading) ? <div> loading ... </div> : 
        (<>
            <h3>Weather in {capital}</h3>
            <div><strong>temperature:</strong> {weatherInfo.current.temperature} degrees</div>
            {weatherInfo.current.weather_icons.map(icon => <img key={icon} src={icon} />)}
            <div><strong>wind:</strong>{weatherInfo.current.wind_speed} kph direction {weatherInfo.current.wind_dir}</div>
        </>)
}

export default CWeather