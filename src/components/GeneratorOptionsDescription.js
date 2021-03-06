import React from 'react';
import { Form } from 'react-bootstrap';
import { buildDescription } from '../logic/descriptionBuilder';
import { DEFAULT_TEXT, ERROR_TEXT, INCORRECT_YEAR_TEXT } from '../logic/descriptionBuilderTexts';

function invokeBuildDescription(options) {
  try {
    return buildDescription(options) || DEFAULT_TEXT;
  }
  catch(e) {
    if (e instanceof TypeError) {
      return INCORRECT_YEAR_TEXT;
    }

    return ERROR_TEXT;
  }
}

export default function GeneratorOptionsDescription({ value }) {
  return <Form.Text className="text-muted">
    {value ? invokeBuildDescription(value) : ERROR_TEXT}
  </Form.Text>;
}
