import React from 'react';
import styles from './Home.module.css';
import City from '../../components/City/City';


function Home(props) {
    const cityOptions = React.createRef();

    let options = props.cities.map(city => {
        let city_value = city.city + ',' + city.country;
        return (<option value={city_value} key={city.id}>{city_value}</option>);
    })

    return (
        <div className={styles.Home}>
            <div className={styles.SelectContainer}>
                <label htmlFor='cities'>Select City:</label>
                <select id='cities' ref={cityOptions} onChange={props.citySelection} className={styles.CitySelector} value={props.selectedCity || ''} >
                    <option>Nothing is selectd</option>
                    {options}
                </select>
            </div>
            {
                props.selectedCity !== null ?
                    <City data={props.selectedCityData} selectedCity={props.selectedCity} addCity={(city) => props.addCity(city)} /> :
                    null
            }
        </div>
    );
}

export default Home;