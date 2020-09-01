import React, { useState } from 'react';
import './City.css';

function City(props) {
    const [tempType, setTempType] = useState('°C');
    const [tempTypes] = useState(['°C', 'K', '°F']);

    let tempCategories = tempTypes.map(type => {
        return <button key={type} className={tempType === type ? 'Active Button' : 'Button'} onClick={() => setTempType(type)}>{type}</button>
    })

    let temperature = null;
    let min_temp = null;
    let max_temp = null;

    if (tempType === '°C') {
        temperature = props.data.main.temp - 273.15;
        min_temp = props.data.main.temp_min - 273.15;
        max_temp = props.data.main.temp_max - 273.15;
    } else if (tempType === 'K') {
        temperature = props.data.main.temp;
        min_temp = props.data.main.temp_min;
        max_temp = props.data.main.temp_max;
    }
    else if (tempType === '°F') {
        temperature = ((props.data.main.temp - 273.15) * 1.8) + 32;
        min_temp = ((props.data.main.temp_min - 273.15) * 1.8) + 32;
        max_temp = ((props.data.main.temp_max - 273.15) * 1.8) + 32;
    }

    return (
        <div className='CityContainer'>
            <div className='City'>
                <p className='CityName'>{props.data.name}</p>
                <p className='Tempreature'>{parseInt(temperature)} {tempType}</p>
                <div className='WeatherDescription'>
                    <span className='Description'>{props.data.weather[0].main}</span>
                    <span>{parseInt(max_temp)} {tempType}/{parseInt(min_temp)} {tempType}</span>
                </div>
                <div className='TempCategories'>
                    Tempreature Type: {tempCategories}
                </div>
            </div>
        </div>
    )
}

export default City;