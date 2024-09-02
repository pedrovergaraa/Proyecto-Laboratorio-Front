import React, { useContext, useLayoutEffect, useRef } from 'react'
import {Map} from 'mapbox-gl';
const MapView = () => {

    const {isLoading, propertyLocation} = useContext(PlacesContext);
    const mapDiv = useRef<HTMLDivElement>(null);


    if (isLoading){
        return(<Loading/>)
    }

    useLayoutEffect(()=>{
        if(!isLoading){
            const map = new Map({
                container: mapDiv.current, // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: propertyLocation, // starting position [lng, lat]
                zoom: 14, // starting zoom
            });
        }

    },[isLoading])
  
    return (
    <div ref={mapDiv}
        style={{
            backgroundColor: "red",
            height: "100vh",  
            width: "100vw",
            left: 0,
            top: 0,
            position: "fixed"
        }}
    >
     {propertyLocation?.join(",")} 
    </div>
  )
}

export default MapView
