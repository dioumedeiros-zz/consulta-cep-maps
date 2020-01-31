import React, { useState } from "react";
import api from "./services/api";

import Geocode from "react-geocode";

function App() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);

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
        console.log(lat, lng);
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
      <div>{address ? address.logradouro : ""}</div>
    </div>
  );
}

export default App;
