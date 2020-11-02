import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core'
import SearchAppBar from '../sections/Navbar'
import Datascreen from './data-screen/Datascreen'
import Errorscreen from './error-screen/Errorscreen'

import useInpuState from '../../Hooks/useInputState'
const api = {
    key: '925eb958bfa1d5211e1f269ee689cfef',
    base: 'https://api.openweathermap.org/data/2.5/weather', 
    daysCall: 'https://api.openweathermap.org/data/2.5/forecast',
    corsUrl: 'https://cors-anywhere.herokuapp.com',

}
  
function Home(props) {
    const [value, handleChange, reset] = useInpuState("");
    const [weather, setWeather] = useState({})
    const [allWeather, setAllWeather] = useState({})

    const search = evt => {
        evt.preventDefault();
        console.log('zxffg')
        if (evt.key == "Enter") {
            // let url = `${api.base}?q=${value}&appid=${api.key}`
            let url = `${api.corsUrl}/${api.base}?q=${value}&appid=${api.key}`
            // const proxyurl = "https://cors-anywhere.herokuapp.com/";

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
                    if(typeof result.coord !== 'undefined') {
                        searchAllData(result.coord);
                    }
                   
                })
        }
    }
    function searchAllData( coord){
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
        <div style={{backgroundAttachment:"fixed"}}> <SearchAppBar onChange={handleChange} value={value} searchable={search}></SearchAppBar> </div>
           
            { typeof weather.main !== 'undefined' && weather.cod === 200 ? <Datascreen alldatas={allWeather} data={weather} value={value}></Datascreen> : <Errorscreen></Errorscreen>}

        </>
    );
}

export default Home;

