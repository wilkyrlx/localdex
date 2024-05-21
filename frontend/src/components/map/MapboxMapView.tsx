import React, { useRef, useEffect, useState } from 'react';
import Map, { ViewStateChangeEvent, MapLayerMouseEvent, Source, Layer, PointLike, MapRef } from "react-map-gl"

// TODO: currently uses MapboxGl, Leaflet is free and may be an easier option
function MapboxMapView() {

    const [viewState, setViewState] = useState({
        longitude: -71.4040,
        latitude: 41.8278,
        zoom: 12,
        bearing: 0,
        pitch: 0,
        padding: { top: 1, bottom: 20, left: 1, right: 1 }
    })

    //useRef hook for a map reference
    const mapRef = useRef<MapRef>(null)

    const mapboxAccessToken: string = process.env.REACT_APP_MAPBOXGL_API_KEY as string || "NONE_MAPBOX_TOKEN"

    return (
        <div className="map-demo">
            <div className="map-demo-map">
                <Map
                    mapboxAccessToken={mapboxAccessToken}
                    latitude={viewState.latitude}
                    longitude={viewState.longitude}
                    zoom={viewState.zoom}
                    pitch={viewState.pitch}
                    bearing={viewState.bearing}
                    padding={viewState.padding}
                    onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
                    // onClick={(e: MapLayerMouseEvent) => onMouseClick(e)}
                    // FIXME: This is too big, and the 0.9 factor is pretty hacky
                    style={{ width: window.innerWidth * 0.7, height: window.innerHeight * 0.7 }}
                    mapStyle={'mapbox://styles/mapbox/light-v10'}
                    ref={mapRef}>

                    {/* <Source id="geo_data" type="geojson" data={overlay}>
                        <Layer {...geoLayer} />
                    </Source> */}
                </Map>
            </div>

        </div>
    )
}

export default MapboxMapView