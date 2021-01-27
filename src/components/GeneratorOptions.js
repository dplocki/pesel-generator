import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { GenderEnum } from '../logic/genderEnum';


const genderOptions = [
  { value: GenderEnum.Any, label: 'Dowolna płeć' },
  { value: GenderEnum.Male, label: 'Mężczyzna' },
  { value: GenderEnum.Female, label: 'Kobieta' }
];


export default function GeneratorOptions({ onChange }) {
  let yearOrAgeMeaning = '=';
  let yearOrAge = 0;
  let gender = GenderEnum.Any;

  const invokeOnChange = () => onChange({ yearOrAgeMeaning: yearOrAgeMeaning, yearOrAge: yearOrAge, gender: gender});

  return <InputGroup>
    <select onChange={e => { yearOrAgeMeaning = e.target.value; invokeOnChange() }}>
      <option value="=">=</option>
      <option value=">">&gt;</option>
      <option value=">=">&gt;=</option>
      <option value="<">&lt;</option>
      <option value="=<">=&lt;</option>
    </select>
    <FormControl onChange={e => { yearOrAge = parseInt(e.target.value, 10); invokeOnChange() }} />
    <select onChange={e => {gender = parseInt(e.target.value, 10); invokeOnChange() }}>
      {genderOptions.map(go => <option key={go.value} value={go.value}>{go.label}</option>)}
    </select>
  </InputGroup>;
}
