import React from 'react';
import './Datascreen.css'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
function kelvinToCelsius(kel) {
    // Convert from Kelvin to Celsius	
    // ℃=K-273.15
    return Math.ceil(kel - 273.15)
}

function meterToKilometer(met) {
    // km=m/1000
    return (Math.ceil(met / 1000))
}

function mtPerSecToKmHr(mtPerSec) {
    return Math.ceil(mtPerSec * (18 / 5))
}
function urlMaker(icon) {
    let url = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    return url
}

function getWeekDay(dt) {
     
    var d = new Date(dt);

    var weekday = new Array(7);

    weekday[0] = "Sun";

    weekday[1] = "Mon";

    weekday[2] = "Tue";

    weekday[3] = "Wed";

    weekday[4] = "Thur";

    weekday[5] = "Fri";

    weekday[6] = "Sat";

    
    let n = weekday[d.getDay()];
    return n  
    
}
function getDay(d) { 
    let rawDate = new Date(d)
    let date= rawDate.getDate()
   let day = getWeekDay(d)
   console.log(date,day);
   return (<span>{day}&nbsp;{date}</span>)
   
}
function Datascreen(props) {

    const weatheData = props.data;
    const allInfoData = props.alldatas;
    const hourlyData = allInfoData.hourly;
    const dailyData = allInfoData.list;
    console.log('dailyData', dailyData)
    let { base, clouds, coord, main, name, sys, timezone, visibility, weather, wind } = weatheData;
    let imageUrl = "http://openweathermap.org/img/wn/" + weather[0].icon + "@2x.png"
    const classes = useStyles();

    return (
        <>
            <div className={classes.root} className="background-cover night">

                <Grid container   >

                    <Grid xs={12} >
                        <Grid container className="font">

                            <Grid item xs={4}> </Grid>
                            <Grid item xs={4}>
                                <p className="font" style={{ fontSize: "25px", margin: "0.5%" }}>{name}</p>
                            </Grid>
                            <Grid item xs={4}>  </Grid>
                            <Grid item xs={5}>  </Grid>
                            <Grid item xs={1}> <img src={imageUrl} /></Grid>
                            <Grid item xs={1}><span style={{ fontSize: "60px" }}>{kelvinToCelsius(main.temp)}° </span>  C</Grid>
                            <Grid item xs={5}>  </Grid>
                            <Grid item xs={5}>  </Grid>
                            <Grid item xs={2} style={{ fontSize: "25px", lineHeight: "0" }}><span>{weather[0].description}</span>  </Grid>
                            <Grid item xs={5}>  </Grid>
                            <Grid item xs={4}>  </Grid>
                            <Grid item xs={4} style={{ marginTop: "21px" }}>
                                <Grid container spacing={1} className="details">
                                    <Grid item xs={4}> <span>Feels like &nbsp; {kelvinToCelsius(main.feels_like)} °C</span> </Grid>
                                    <Grid item xs={4}> <span>Wind speed  &nbsp;  {mtPerSecToKmHr(wind.speed)} km/h</span> </Grid>
                                    <Grid item xs={4}><span>Visibility   &nbsp; {meterToKilometer(visibility)} km </span> </Grid>
                                    <Grid item xs={4}>  <span>Humidity  &nbsp; {main.humidity}   % </span> </Grid>
                                    <Grid item xs={4}> <span>Pressure  &nbsp; {main.pressure}  hPa </span> </Grid>
                                    <Grid item xs={4}> <span>Sea Level  &nbsp; {main.sea_level ? main.sea_level : 0}  hPa </span> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>  </Grid>

                        </Grid>

                    </Grid>

                </Grid>


                {/* <div className="font" style={{ float: "left", padding: "2%" }}>Daily</div>

                <div className="container-1">
                    {typeof dailyData !== 'undefined' && dailyData.length > 0 ? dailyData.map((data, index) =>
                   
                    (
                       
                         <div className="flex-box" key={index}>
                                <div className="box">
                                    <div>Mon 2</div>
                                     
                                    <img className="smallImage" src={urlMaker(data.weather[0].icon)} />
                                </div>

                            </div>
                       
                    ) ) : 'No Data Available'}

                 </div> */}
                <br />

                <div className="font" style={{ float: "left", padding: "2%" }}>Daily and Hourly</div>
               
                <br/>

                <div className="container-1 scrolling-wrapper">
                    {typeof dailyData != 'undefined' && dailyData.length > 0 ? dailyData.map((data, index) => (
                        <div className="flex-box wrapper">
                            <div className="box">
                        <div>{getDay(data.dt_txt)}</div>
                            <img className="smallImage" src={urlMaker(data.weather[0].icon)} /> <br/>
                             <div> <span style={{    fontSize: "28px",fontWeight: 400}}>{kelvinToCelsius(data.main.temp_max)}°</span>&nbsp;<span>{kelvinToCelsius(data.main.temp_min)}°</span></div> 
                            <div>
                                {data.weather[0].description}
                            </div>
                            </div>

                        </div>
                    )) : ''}

                </div>

            </div></>

    );
}

export default Datascreen;