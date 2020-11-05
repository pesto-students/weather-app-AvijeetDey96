import React, { useState,useEffect } from 'react';
import SearchAppBar from '../sections/Navbar'
import Datascreen from './data-screen/Datascreen'
import Errorscreen from './error-screen/Errorscreen'

import useInpuState from '../../Hooks/useInputState'
import axios from "axios";

let geoWeather = 'aaa';
const api = {
    key: 'a03ddfcfde2a4376a2d6d014ec9fbf6c',
    base: 'https://api.openweathermap.org/data/2.5/weather',
    daysCall: 'https://api.openweathermap.org/data/2.5/forecast',
    // corsUrl: 'https://cors-anywhere.herokuapp.com',

}



 
function Home(props) {
    const [value, handleChange, reset] = useInpuState("");
    const [weather, setWeather] = useState({})
    const [allWeather, setAllWeather] = useState({})
    const [loader, setLoader] = useState(false)

    // var options = {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 0
    // };
    
//     function success(pos) {
//         var crd = pos.coords;
//          getLocationUsinfLonLat(crd.longitude, crd.latitude)
//     }
    
//     function error(err) {
//         console.warn(`ERROR(${err.code}): ${err.message}`);
//     }
    
    
//      function getGeo(){
//         navigator.geolocation.getCurrentPosition(success, error, options);
//      }
//     const getLocationUsinfLonLat = (lon, lat) => {
//         let url = `${api.base}?lat=${lat}&lon=${lon}&appid=${api.key}`
   
//        axios.get(url)
//            .then(function (res) {
//                let result = res.data;
//                geoWeather = result;
//                return result;
//            })
//            .catch(function (error) {
//                // handle error
//                console.log(error);
//            })
//    }
//    getGeo();
    useEffect(()=>{
        
    })
 const defaultSearch =()=>{
    let url = `${api.base}?q=siliguri&appid=${api.key}`
    axios.get(url)
                .then(function (res) {

                    let result = res.data;
                    setWeather(result);
                    let url = `${api.daysCall}?q=siliguri&appid=${api.key}`

                    // axios.get(url)
                    //     .then(function (res) {
                    //         console.log('weather', res.data)
                    //         let result = res.data;
                    //         setAllWeather(result);
                    //         reset();
                    //         setLoader(false);
                    //     })
                    //     .catch(function (error) {
                    //         // handle error
                    //         console.log(error);
                    //     })
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    let result ={message:'city not found'}
                    setWeather(result);

                })
 }
 defaultSearch();
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
                    let result ={message:'city not found'}
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

