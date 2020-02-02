import React, { useState, useEffect } from 'react';
import { MdRoom } from 'react-icons/md';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Form, Input } from '@rocketseat/unform';
import Geocode from 'react-geocode';
import api from './services/api';

import GlobalStyles from './styles/global';
import { All, Container, Content, Map } from './styles';

function App() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 15,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setViewport({
          ...viewport,
          latitude,
          longitude,
        });
      },
      err => {
        console.log(err);
      },
      {
        timeout: 300000,
      }
    );
  }, [viewport]);

  function getGeocoding(value) {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.setLanguage('pt-br');
    Geocode.setRegion('br');

    const geoAdress = `${value.logradouro}, ${value.localidade}, ${value.uf}`;
    Geocode.fromAddress(geoAdress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  async function handleAddress() {
    const response = await api.get(`/${cep}/json`);

    setAddress(response.data);
    getGeocoding(response.data);
    setCep('');
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

              <button type="submit">Pesquisar</button>
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
                // eslint-disable-next-line react/jsx-props-no-spreading
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
