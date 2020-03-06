import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { MdRoom } from 'react-icons/md';

export default function MapGL({ viewport, setViewport }) {
  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="75vh"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/dioumedeiros/ck62bu4ou0wzv1ilg31xlm32l"
      onViewportChange={setViewport}
    >
      <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
        <MdRoom size={35} color="#F44336" />
      </Marker>
    </ReactMapGL>
  );
}
