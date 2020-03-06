import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';

export default function FormMap({ cep, setCep, submitForm }) {
  return (
    <Form onSubmit={submitForm}>
      <Input
        name="cep"
        placeholder="Consulte um CEP"
        value={cep}
        onChange={e => setCep(e.target.value)}
      />

      <button type="submit">Pesquisar</button>
    </Form>
  );
}

FormMap.defaultProps = {
  cep: PropTypes.string,
  submitForm: PropTypes.func,
  setCep: PropTypes.func,
};

FormMap.propTypes = {
  cep: PropTypes.string,
  submitForm: PropTypes.func,
  setCep: PropTypes.func,
};
