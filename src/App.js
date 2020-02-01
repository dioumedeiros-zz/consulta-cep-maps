import React, { useState, useEffect } from "react";
import { MdRoom } from "react-icons/md";
import ReactMapGL, { Marker } from "react-map-gl";
import { Form, Input } from "@rocketseat/unform";
import api from "./services/api";
import Geocode from "react-geocode";

import GlobalStyles from "./styles/global";
import { All, Container, Content, Map } from "./styles";

function App() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 15
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
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
        timeout: 300000
      }
    );
  }, [viewport]);

  async function handleAddress() {
    const response = await api.get(`/${cep}/json`);

    setAddress(response.data);
    getGeocoding(response.data);
    setCep("");
  }

  function getGeocoding(address) {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.setLanguage("pt-br");
    Geocode.setRegion("br");

    const geoAdress = `${address.logradouro}, ${address.localidade}, ${address.uf}`;
    Geocode.fromAddress(geoAdress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
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
    <>
      <GlobalStyles />
      <All>
        <Container>
          <Content>
            <Form onSubmit={handleAddress}>
              <Input
                name="cep"
                placeholder="Consulte um CEP"
                value={cep}
                onChange={e => setCep(e.target.value)}
              />

              <button>Pesquisar</button>
            </Form>
            <div className="info">
              <strong>{address.logradouro}</strong>
              <div>{address.bairro}</div>
              <div>
                {address.localidade} {address.uf}
              </div>
              <div>{address.cep}</div>
            </div>
            <Map>
              <ReactMapGL
                {...viewport}
                width="100%"
                height="75vh"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/dioumedeiros/ck62bu4ou0wzv1ilg31xlm32l"
                onViewportChange={setViewport}
              >
                <Marker
                  latitude={viewport.latitude}
                  longitude={viewport.longitude}
                >
                  <MdRoom size={35} color="#F44336" />
                </Marker>
              </ReactMapGL>
            </Map>
          </Content>
        </Container>
      </All>
    </>
  );
}

export default App;
