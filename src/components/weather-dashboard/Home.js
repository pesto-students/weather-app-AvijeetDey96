import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core'
import SearchAppBar from '../sections/Navbar'
import Datascreen from './data-screen/Datascreen'
import Errorscreen from './error-screen/Errorscreen'

import useInpuState from '../../Hooks/useInputState'
const api = {
    key: '925eb958bfa1d5211e1f269ee689cfef',
    base: 'https://api.openweathermap.org/data/2.5/weather',
    corsUrl: 'https://cors-anywhere.herokuapp.com'
}
function Home(props) {
    const [value, handleChange, reset] = useInpuState("");
    const [weather, setWeather] = useState({})

    const search = evt => {
        evt.preventDefault();
        if (evt.key == "Enter") {
            // let url = `${api.base}?q=${value}&appid=${api.key}`
              let url = `${api.corsUrl}/${api.base}?q=${value}&appid=${api.key}`
            // const proxyurl = "https://cors-anywhere.herokuapp.com/";

            fetch(( url), {
                crossDomain: true,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                   'Access-Control-Allow-Origin':'*'
                }
            })
                .then(res => {
                   return res.json();  
                })
                .then(result => {
                    console.log('weather', result)

                    setWeather(result);
                    reset();
                })
        }


   
    }
    return (
        <>
            <SearchAppBar style={{ position: "sticky",top: 0,zIndex: 100}} onChange={handleChange} value={value} searchable={search}></SearchAppBar>
        { typeof weather.main !=='undefined' && weather.cod === 200?<Datascreen data={weather} value={value}></Datascreen> :<Errorscreen></Errorscreen>} 
            
        </>
    );
}

export default Home;

