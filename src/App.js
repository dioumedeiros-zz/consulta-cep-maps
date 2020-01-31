import React, { useState, useEffect } from "react";
import { MdRoom } from "react-icons/md";
import ReactMapGL, { Marker } from "react-map-gl";

import api from "./services/api";

import Geocode from "react-geocode";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({});
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 15
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
        setViewport({
          ...viewport,
          latitude: latitude,
          longitude: longitude
        });
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, [viewport]);

  async function handleAddress(e) {
    e.preventDefault();
    const response = await api.get(`/${cep}/json`);

    setAddress(response.data);

    getGeocoding();
  }

  function getGeocoding() {
    Geocode.setApiKey("AIzaSyDSQcuMYmIsKthysrLQd-AGHhfN5acLRCk");
    Geocode.setLanguage("pt-br");
    Geocode.setRegion("br");

    Geocode.fromAddress("Rua Reginaldo Luis da Silva, tubarão, SC").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  return (
    <div>
      <form onSubmit={handleAddress}>
        <input
          name="cep"
          placeholder="Insira o CEP"
          value={cep}
          onChange={e => setCep(e.target.value)}
        />

        <button>Pesquisar</button>
      </form>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/dioumedeiros/ck62bu4ou0wzv1ilg31xlm32l"
        onViewportChange={setViewport}
      >
        <Marker latitude={latitude} longitude={longitude}>
          <MdRoom size={35} color="#F44336" />
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
