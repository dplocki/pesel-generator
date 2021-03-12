import React, { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { GenderEnum } from '../logic/genderEnum';
import { SignEnum } from '../logic/signEnum';


const genderOptions = [
  { value: GenderEnum.Any, label: 'Dowolna płeć' },
  { value: GenderEnum.Male, label: 'Mężczyzna' },
  { value: GenderEnum.Female, label: 'Kobieta' }
];

const signOptions = [
  { value: SignEnum.Equal, label: '=' },
  { value: SignEnum.Greater, label: '>' },
  { value: SignEnum.Lesser, label: '<' },
];

export default function GeneratorOptions({ onChange }) {
  const [dateOrAgeSign, setDateOrAgeSign] = useState(SignEnum.Equal);
  const [dateOrAge, setDateOrAge] = useState('');
  const [gender, setGender] = useState(GenderEnum.Any);

  const saveAndInvokeOnChange = (dateOrAgeSign, dateOrAge, gender) => {
    setDateOrAgeSign(dateOrAgeSign);
    setDateOrAge(dateOrAge);
    setGender(gender);

    onChange({
      dateOrAgeSign: +dateOrAgeSign,
      dateOrAge: dateOrAge.trim(),
      gender: +gender
    });
  };

  return <InputGroup>
    <select onChange={e => saveAndInvokeOnChange(parseInt(e.target.value, 10), dateOrAge, gender)}>
      {signOptions.map(so => <option key={so.value} value={so.value}>{so.label}</option>)}
    </select>
    <FormControl onChange={e => saveAndInvokeOnChange(dateOrAgeSign, e.target.value, gender)} />
    <select onChange={e => saveAndInvokeOnChange(dateOrAgeSign, dateOrAge, parseInt(e.target.value, 10))}>
      {genderOptions.map(go => <option key={go.value} value={go.value}>{go.label}</option>)}
    </select>
  </InputGroup>;
}
