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

function Datascreen(props) {

    const weatheData = props.data;
    let { base, clouds, coord, main, name, sys, timezone, visibility, weather, wind } = weatheData;
    let imageUrl = "http://openweathermap.org/img/wn/" + weather[0].icon + "@2x.png"
    const classes = useStyles();
    return (
<>
<div className={classes.root}>
     
      <Grid container spacing={3} className="background-cover night">
       
        <Grid item xs={12} >

        <div className="font">
            <p>{name}</p>
        <img src={imageUrl} />
            {weather[0].description}
           
        </div>
       
        </Grid>
         
      </Grid>
    
    </div></>
      
    );
}

export default Datascreen;