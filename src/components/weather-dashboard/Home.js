import React, { useState, useEffect } from 'react';
import SearchAppBar from '../sections/Navbar'
import Datascreen from './data-screen/Datascreen'
import Errorscreen from './error-screen/Errorscreen'

import useInpuState from '../../Hooks/useInputState'
import axios from "axios";

let geoWeather = 'aaa';
const api = {
    // key: 'd172dc99a5e30b034410018f07063660',
    key:'9e1e8efd40fb550bfefb6451701a4a57',
    base: 'https://api.openweathermap.org/data/2.5/weather',
    daysCall: 'https://api.openweathermap.org/data/2.5/forecast',
    // corsUrl: 'https://cors-anywhere.herokuapp.com',
}




function Home(props) {
    const [value, handleChange, reset] = useInpuState("");
    const [weather, setWeather] = useState({})
    const [allWeather, setAllWeather] = useState({})
    const [loader, setLoader] = useState(false)

   
    const defaultSearch = () => {
        let url = `${api.base}?q=Delhi&appid=${api.key}`
        axios.get(url)
            .then(function (res) {

                let result = res.data;
                setWeather(result);
                let url = `${api.daysCall}?q=siliguri&appid=${api.key}`

                axios.get(url)
                    .then(function (res) {
                        console.log('weather', res.data)
                        let result = res.data;
                        setAllWeather(result);
                        reset();
                        setLoader(false);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                let result = { message: 'city not found' }
                setWeather(result);

            })
    }
    useEffect(() => {
        defaultSearch();
    },[])
    const search = evt => {
        evt.preventDefault();
        if (evt.key === "Enter") {
            let url = `${api.base}?q=${value}&appid=${api.key}`
            setLoader(true);
            axios.get(url)
                .then(function (res) {

                    let result = res.data;
                    setWeather(result);
                    searchAllData();
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    let result = { message: 'city not found' }
                    setWeather(result);

                })

        }
    }
    function searchAllData() {
        let url = `${api.daysCall}?q=${value}&appid=${api.key}`

        axios.get(url)
            .then(function (res) {
                console.log('weather', res.data)
                let result = res.data;
                setAllWeather(result);
                reset();
                setLoader(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
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

