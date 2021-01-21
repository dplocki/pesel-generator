import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { GenderEnum } from '../logic/genderEnum';


const genderOptions = [
  { value: GenderEnum.Any, label: 'Dowolna płeć' },
  { value: GenderEnum.Male, label: 'Mężczyzna' },
  { value: GenderEnum.Female, label: 'Kobieta' }
];

export default function GeneratorOptions() {
  return <InputGroup>
    <select name="peselAgeSign">
      <option value="=">=</option>
      <option value=">">&gt;</option>
      <option value="<">&lt;</option>
    </select>
    <FormControl />
    <select>
      {genderOptions.map(go => <option key={go.value} value={go.value}>{go.label}</option>)}
    </select>
  </InputGroup>;
}
