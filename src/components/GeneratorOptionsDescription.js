import React from 'react';
import { Form } from 'react-bootstrap';

export default function GeneratorOptionsDescription({ options }) {
  const description = 'Dowolny PESEL';

  return <Form.Text className="text-muted">
    {description}
  </Form.Text>;
}
