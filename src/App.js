import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';

import MapGL from './components/MapGL';
import FormMap from './components/FormMap';
import InfoMap from './components/InfoMap';
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
        console.error(err);
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

    const geoAdress = `${value.logradouro}, ${value.bairro}, ${value.localidade}, ${value.uf}`;
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
            <FormMap cep={cep} setCep={setCep} submitForm={handleAddress} />
            <InfoMap address={address} />
            <Map>
              <MapGL viewport={viewport} setViewport={setViewport} />
            </Map>
          </Content>
        </Container>
      </All>
    </>
  );
}

export default App;
