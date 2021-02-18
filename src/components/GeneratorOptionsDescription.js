import React from 'react';
import { Form } from 'react-bootstrap';
import { buildDescription } from '../logic/descriptionBuilder.js';

const DEFAULT_TEXT = 'Dowolne PESEL-e';

export default function GeneratorOptionsDescription({ value }) {
  return <Form.Text className="text-muted">
    {value ? (buildDescription(value) || DEFAULT_TEXT) : DEFAULT_TEXT}
  </Form.Text>;
}
