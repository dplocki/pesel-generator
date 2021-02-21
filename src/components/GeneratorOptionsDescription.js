import React from 'react';
import { Form } from 'react-bootstrap';
import { buildDescription } from '../logic/descriptionBuilder';
import { DEFAULT_TEXT, ERROR_TEXT } from '../logic/descriptionBuilderTexts';

function invokeBuildDescription(options) {
  try {
    return buildDescription(options) || DEFAULT_TEXT;
  }
  catch
  {
    return ERROR_TEXT;
  }
}

export default function GeneratorOptionsDescription({ value }) {
  return <Form.Text className="text-muted">
    {value ? invokeBuildDescription(value) : DEFAULT_TEXT}
  </Form.Text>;
}
