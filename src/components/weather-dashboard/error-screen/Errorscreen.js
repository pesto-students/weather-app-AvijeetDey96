import React from 'react';
import './errorscreen.css'

function Errorscreen(props) {
    const weatheData = props.data.message;
    return (
        <div  className="background-cover night ">
           <div className=" fonta">
           {weatheData}
           </div>
          
        </div>
    );
}

export default Errorscreen;