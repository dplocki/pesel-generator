import React, { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { GenderEnum } from '../logic/genderEnum';


const genderOptions = [
  { value: GenderEnum.Any, label: 'Dowolna płeć' },
  { value: GenderEnum.Male, label: 'Mężczyzna' },
  { value: GenderEnum.Female, label: 'Kobieta' }
];


export default function GeneratorOptions({ onChange }) {
  const [yearOrAgeMeaning, setYearOrAgeMeaning] = useState('=');
  const [yearOrAge, setYearOrAge] = useState(0);
  const [gender, setGender] = useState(GenderEnum.Any);

  const saveAndInvokeOnChange = (yearOrAgeMeaning, yearOrAge, gender) => {
    setYearOrAgeMeaning(yearOrAgeMeaning);
    setYearOrAge(yearOrAge);
    setGender(gender);

    onChange({
      yearOrAgeMeaning: yearOrAgeMeaning,
      yearOrAge: yearOrAge,
      gender: gender
    });
  };

  return <InputGroup>
    <select onChange={e => saveAndInvokeOnChange(e.target.value, yearOrAge, gender) }>
      <option value="=">=</option>
      <option value=">">&gt;</option>
      <option value=">=">&gt;=</option>
      <option value="<">&lt;</option>
      <option value="=<">=&lt;</option>
    </select>
    <FormControl onChange={e => saveAndInvokeOnChange(yearOrAgeMeaning, parseInt(e.target.value, 10), gender) } />
    <select onChange={e => saveAndInvokeOnChange(yearOrAgeMeaning, yearOrAge, parseInt(e.target.value, 10)) }>
      {genderOptions.map(go => <option key={go.value} value={go.value}>{go.label}</option>)}
    </select>
  </InputGroup>;
}
