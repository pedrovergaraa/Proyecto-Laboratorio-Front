import { Map } from 'mapbox-gl';
import React, { createContext } from 'react'

interface MapContextProps {
    isMapReady: boolean;
    map?: Map,

}

export const MapContext = createContext({} as MapContextProps);
