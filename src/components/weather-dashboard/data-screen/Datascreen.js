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

function Datascreen(props) {

    const weatheData = props.data;
    let { base, clouds, coord, main, name, sys, timezone, visibility, weather, wind } = weatheData;
    let temp = kelvinToCelsius(main.temp)
    let temp_min = kelvinToCelsius(main.temp_min)
    let imageUrl = "http://openweathermap.org/img/wn/" + weather[0].icon + "@2x.png"
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>

                <Grid container spacing={3} className="background-cover night">

                    <Grid item xs={12} >
                        <Grid container className="font">

                            <Grid item xs={4}> </Grid>
                            <Grid item xs={4}>
                                <p className="font" style={{ fontSize: "25px", margin: "0.5%" }}>{name}</p>
                            </Grid>
                            <Grid item xs={4}>  </Grid>
                            <Grid item xs={5}>  </Grid>
                            <Grid item xs={1}> <img src={imageUrl} /></Grid>
                            <Grid item xs={1}><span style={{ fontSize: "60px" }}>{temp}° </span>  C</Grid>
                            <Grid item xs={5}>  </Grid>
                            <Grid item xs={5}>  </Grid>
                            <Grid item xs={2} style={{ fontSize: "25px",lineHeight: "0" }}><span>{weather[0].description}</span>  </Grid>
                            <Grid item xs={5}>  </Grid>
                            <Grid item xs={4}>  </Grid>
                            <Grid item xs={4} style={{ marginTop: "21px"}}>
                                <Grid container spacing={1} className="details">
                                    <Grid item xs={4}> <span>Feels like &nbsp; {kelvinToCelsius(main.feels_like)} °C</span> </Grid>
                                    <Grid item xs={4}> <span>Wind speed  &nbsp;  {mtPerSecToKmHr(wind.speed)} km/h</span> </Grid>
                                    <Grid item xs={4}><span>Visibility   &nbsp; {meterToKilometer(visibility)} km </span> </Grid>
                                    <Grid item xs={4}>  <span>Humidity  &nbsp; {main.humidity}   % </span> </Grid>
                                    <Grid item xs={4}> <span>Pressure  &nbsp; {main.pressure}  hPa </span> </Grid>
                                    <Grid item xs={4}> <span>Sea Level  &nbsp; {main.sea_level}  hPa </span> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>  </Grid>

                        </Grid>
                        {/* <div className="font">
                        
                           
                             <br />
                            <br />
                             <br />
                            <br />
                            <span>grnd_level {main.grnd_level}  hPa </span> <br />
                        </div> */}

                    </Grid>

                </Grid>

            </div></>

    );
}

export default Datascreen;