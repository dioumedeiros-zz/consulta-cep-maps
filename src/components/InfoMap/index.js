import React from 'react';
import PropTypes from 'prop-types';

export default function InfoMap({ address }) {
  return (
    <div className="info">
      <strong>{address.logradouro}</strong>
      <div>{address.bairro}</div>
      <div>
        {address.localidade} {address.uf}
      </div>
      <div>{address.cep}</div>
    </div>
  );
}

InfoMap.defaultProps = {
  address: PropTypes.string,
};

InfoMap.propTypes = {
  address: PropTypes.string,
};
