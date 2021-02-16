import React, { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { GenderEnum } from '../logic/genderEnum';


const genderOptions = [
  { value: GenderEnum.Any, label: 'Dowolna płeć' },
  { value: GenderEnum.Male, label: 'Mężczyzna' },
  { value: GenderEnum.Female, label: 'Kobieta' }
];


export default function GeneratorOptions({ onChange }) {
  const [dateOrAgeSign, setDateOrAgeSign] = useState('=');
  const [dateOrAge, setDateOrAge] = useState(0);
  const [gender, setGender] = useState(GenderEnum.Any);

  const saveAndInvokeOnChange = (dateOrAgeSign, dateOrAge, gender) => {
    setDateOrAgeSign(dateOrAgeSign);
    setDateOrAge(dateOrAge);
    setGender(gender);

    onChange((!dateOrAge || dateOrAge.trim().lenght === 0)
      ? null
      : {
        dateOrAgeSign: dateOrAgeSign,
        dateOrAge: dateOrAge,
        gender: gender
      });
  };

  return <InputGroup>
    <select onChange={e => saveAndInvokeOnChange(e.target.value, dateOrAge, gender)}>
      <option value="=">=</option>
      <option value=">">&gt;</option>
      <option value="<">&lt;</option>
    </select>
    <FormControl onChange={e => saveAndInvokeOnChange(dateOrAgeSign, e.target.value, gender)} />
    <select onChange={e => saveAndInvokeOnChange(dateOrAgeSign, dateOrAge, parseInt(e.target.value, 10))}>
      {genderOptions.map(go => <option key={go.value} value={go.value}>{go.label}</option>)}
    </select>
  </InputGroup>;
}
