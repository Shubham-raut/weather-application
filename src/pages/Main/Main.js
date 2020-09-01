import React, { useState, useEffect } from "react";
import axios from "axios";
import City from "../../components/City/City";
import './Main.css';

function Main() {
    const [cities] = useState([
        'Mumbai',
        'Delhi',
        'Chennai',
        'Kolkata',
        'Bangalore'
    ]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCityData, setSelectedCityData] = useState(null);

    const cityOptions = React.createRef();
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


    const citySelectionHandlor = (event) => {
        let value = event.target.value;
        axios
            .get('http://api.openweathermap.org/data/2.5/weather?q=' + value + ',IN&APPID=60dfad51347e098c9a6b000ced44c353')
            .then(response => {
                console.log(response.data);
                setSelectedCityData(response.data);
                setSelectedCity(value);
            })
            .catch(error => alert('Opps\n', error.message));
    }

    let options = cities.map(city => {
        return (<option value={city} key={city}>{city}</option>);
    })


    return (
        <>
            <div className='Navbar'>My Weather Application</div>
            <div>
                <label htmlFor='cities'>Select City:</label>
                <select id='cities' ref={cityOptions} onChange={citySelectionHandlor}>
                    <option>Nothing is selectd</option>
                    {options}
                </select>
            </div>
            {
                selectedCity !== null ?
                    <City data={selectedCityData} /> :
                    null
            }
        </>
    );
}

export default Main;