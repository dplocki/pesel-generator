import React from 'react';
import { Form } from 'react-bootstrap';
import { GenderEnum } from '../logic/genderEnum';


function yearNumberToLabel(value) {
  if (value === 1) {
    return 'rok';
  }

  if ((value < 10 || value > 20) && (value % 10) < 5) {
    return value + ' lata';
  }

  return value + ' lat';
}


function buildDescription(options) {
  const genderLabel = {
    [GenderEnum.Male]: 'mężczyzn',
    [GenderEnum.Female]: 'kobiet',
    [GenderEnum.Any]: 'osób'
  }[options.gender];

  let result = `Tylko PESEL-e ${genderLabel}`;

  if (options.yearOrAge === null) {
    return result;
  }

  const meaningLabel = {
    '<': 'mniej niż',
    '=<': 'co najwyżej',
    '=': 'dokładnie',
    '>=': 'co najmniej',
    '>': 'więcej niż'
  }[options.yearOrAgeMeaning];

  return result + ' mających ' + meaningLabel + ' ' + yearNumberToLabel(options.yearOrAge)
}


export default function GeneratorOptionsDescription({ options }) {
  return <Form.Text className="text-muted">
    {options ? buildDescription(options) : 'Dowolne PESEL-e'}
  </Form.Text>;
}
