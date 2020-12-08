import React, { useState, useEffect } from "react";
// import axios from "axios";
// import City from "../../components/City/City";
// import styles from './Main.module.css';
// import { Switch, Route, NavLink } from 'react-router-dom';
// import Home from "../Home/Home";
import { Form } from "react-bootstrap";
// import styled from "styled-components";

function Main() {
    // const [cities, setCities] = useState([]);
    // const [savedCities, setSavedCities] = useState([]);
    // const [selectedCity, setSelectedCity] = useState(null);
    // const [selectedCityData, setSelectedCityData] = useState(null);
    const [cityInput, setCityInput] = useState('');

    const citySearchHandlor = (event) => {
        event.preventDefault();
        console.log(cityInput);
    }

    // useEffect(() => {
    //     axios
    //         .get('https://weather-app-487b0.firebaseio.com/.json')
    //         .then(response => {
    //             setCities(response.data.cities)
    //             setSavedCities(response.data.savedCities)
    //         })
    //         .catch(error => alert(error));
    // })

    // const isOnline = useFriendStatus(props.friend.id);

    // function useCities() {
    //     const [cities, setCities] = useState(null);
    //     useEffect(() => {
    //         setCities(['Mumbai','Delhi','Chennai','Kolkata','Bangalore']);
    //     })
    //     return (cities);
    // }

    // function useFriendStatus(friendID) {
    //     const [isOnline, setIsOnline] = useState(null);

    //     useEffect(() => {
    //         function handleStatusChange(status) {
    //             setIsOnline(status.isOnline);
    //         }

    //         ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    //         return () => {
    //             ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    //         };
    //     });

    //     return isOnline;
    // }


    // const citySelectionHandlor = (event) => {
    //     let value = event.target.value;
    //     axios
    //         .get('http://api.openweathermap.org/data/2.5/weather?q=' + value + '&APPID=60dfad51347e098c9a6b000ced44c353')
    //         .then(response => {
    //             console.log(response.data);
    //             setSelectedCityData(response.data);
    //             setSelectedCity(value);
    //         })
    //         .catch(error => alert('Opps\n', error.message));
    // }

    // const addCityHandlor = (city) => {
    //     let savedCities = [...savedCities];
    //     savedCities.push(city);
    //     axios
    //         .put('https://weather-app-487b0.firebaseio.com/savedCities.json', savedCities)
    //         .then(response => {
    //             setSavedCities(savedCities);
    //         })
    //         .catch(error => alert(error));
    // }

    // const removeCityHandler = (removed_city) => {
    //     let savedCities = [...savedCities];
    //     savedCities.filter(city => {
    //         return city.split(',')[0] !== removed_city;
    //     })
    //     axios
    //         .get('https://weather-app-487b0.firebaseio.com/savedCities.json', savedCities)
    //         .then(response => {
    //             setSavedCities(savedCities);
    //         })
    //         .catch(error => alert(error));
    // }

    return (
        <main className='container'>
            {/* <div className={styles.Navbar}>
                <p className={styles.Title}>My Weather Application</p>
                <div className={styles.NavItemContainer}>
                    <NavLink exact to="/" activeClassName={styles.Active}>
                        <div className={styles.NavItem}>Home</div>
                    </NavLink>
                    <NavLink to="/mycities" activeClassName={styles.Active}>
                        <div className={styles.NavItem}>My Cities</div>
                    </NavLink>
                </div>
            </div>


            <Switch>
                 <Route path='/mycities' component={() => <MyCities savedCities={savedCities} removedcity={removeCityHandler} />} /> 
                <Route path='/' component={() => <Home cities={cities} selectedCity={selectedCity} citySelection={citySelectionHandlor} selectedCityData={selectedCityData} addCity={addCityHandlor} />} />
            </Switch> */}

            <h1 className='title' >Weather Application</h1>
            <Form onSubmit={citySearchHandlor}>
                <Form.Control placeholder="Search" value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
            </Form>
            <h2 className="title-tag">Search for your City</h2>

        </main>
    );
}

export default Main;