import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core'
import SearchAppBar from '../sections/Navbar'
import Datascreen from './data-screen/Datascreen'
import Errorscreen from './error-screen/Errorscreen'

import useInpuState from '../../Hooks/useInputState'
const api = {
    key: 'a03ddfcfde2a4376a2d6d014ec9fbf6c',
    base: 'https://api.openweathermap.org/data/2.5/weather',
    daysCall: 'https://api.openweathermap.org/data/2.5/forecast',
    corsUrl: 'https://cors-anywhere.herokuapp.com',

}



function Home(props) {
    const [value, handleChange, reset] = useInpuState("");
    const [weather, setWeather] = useState({})
    const [allWeather, setAllWeather] = useState({})


    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    function success(pos) {
        var crd = pos.coords;
    
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getLocationUsinfLonLat(crd.longitude, crd.latitude)
    }
    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);

    const  getLocationUsinfLonLat = (lon, lat)=> {
        let url = `${api.corsUrl}/${api.base}?lat=${lat}&lon=${lon}&appid=${api.key}`
        fetch((url), {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                return res.json();
            })
            .then(result => {
                console.log('weather', result)
                setWeather(result);
                
                    searchAllData();
                
    
            })
    }

    const search = evt => {
        evt.preventDefault();
        if (evt.key == "Enter") {
            // let url = `${api.base}?q=${value}&appid=${api.key}`
            let url = `${api.corsUrl}/${api.base}?q=${value}&appid=${api.key}`
            // const proxyurl = "https://cors-anywhere.herokuapp.com/";
            console.log(url);
            fetch((url), {
                crossDomain: true,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    console.log('weather', result)
                    setWeather(result);
                    
                        searchAllData();
                     

                })
        }
    }
    function searchAllData() {
        let url = `${api.corsUrl}/${api.daysCall}?q=${value}&appid=${api.key}`
        //    let url = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=26.7&lon=88.43&exclude=minutely&appid=925eb958bfa1d5211e1f269ee689cfef"
        fetch((url), {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                return res.json();
            })
            .then(result => {
                setAllWeather(result);
                reset();
            })

    }
    return (
        <>
            <div style={{ backgroundAttachment: "fixed" }}> <SearchAppBar onChange={handleChange} value={value} searchable={search}></SearchAppBar> </div>

            { typeof weather.main !== 'undefined' && weather.cod === 200 ? <Datascreen alldatas={allWeather} data={weather} value={value}></Datascreen> : <Errorscreen data={weather}></Errorscreen>}

        </>
    );
}

export default Home;

