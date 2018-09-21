import moment from 'moment';
import { generatePESEL } from './generate';
import { checkPESEL, characterToDigit } from './pesel';

it('generated PESEL should have eleven digits', () => {
  expect(generatePESEL(moment("20111031")).length).toBe(11);
  expect(generatePESEL(moment("19770206")).length).toBe(11);
  expect(generatePESEL(moment("20080823")).length).toBe(11);
});

it('generated PESEL from data range 1800 - 1899 should start with does number', () => {
  expect(generatePESEL(moment("18001031")).substring(0, 6)).toBe('009031');
  expect(generatePESEL(moment("18740112")).substring(0, 6)).toBe('748112');
  expect(generatePESEL(moment("18990412")).substring(0, 6)).toBe('998412');
});

it('generated PESEL from data range 1900 - 1999 should start with does number', () => {
  expect(generatePESEL(moment("19001031")).substring(0, 6)).toBe('001031');
  expect(generatePESEL(moment("19740112")).substring(0, 6)).toBe('740112');
  expect(generatePESEL(moment("19990412")).substring(0, 6)).toBe('990412');
});

it('generated PESEL from data range 2000 - 2099 should have 20 added to month number', () => {
  expect(generatePESEL(moment("20111031")).substring(0, 6)).toBe('113031');
  expect(generatePESEL(moment("20740112")).substring(0, 6)).toBe('742112');
  expect(generatePESEL(moment("20991212")).substring(0, 6)).toBe('993212');
});

it('generated PESEL from data range 2100 - 2199 should have 40 added to month number', () => {
  expect(generatePESEL(moment("21111031")).substring(0, 6)).toBe('115031');
  expect(generatePESEL(moment("21740112")).substring(0, 6)).toBe('744112');
  expect(generatePESEL(moment("21991212")).substring(0, 6)).toBe('995212');
});

it('generated PESEL from data range 2200 - 2299 should have 60 added to month number', () => {
  expect(generatePESEL(moment("22111031")).substring(0, 6)).toBe('117031');
  expect(generatePESEL(moment("22740112")).substring(0, 6)).toBe('746112');
  expect(generatePESEL(moment("22991212")).substring(0, 6)).toBe('997212');
});

it('generated PESEL should be valid one', () => {
  const pesel = generatePESEL(moment("20130412"));

  expect(checkPESEL(pesel)).toBe(true);
});

it('generated PESEL should have proper gender encoded', () => {
  function get10thDigithOfGeneratedPESEL(date, gender) {
    const _10thDigit = generatePESEL(moment(date), gender).substring(10, 0);

    return characterToDigit(_10thDigit);
  }

  expect(get10thDigithOfGeneratedPESEL('19230212', 'male') % 2).toBe(1);
  expect(get10thDigithOfGeneratedPESEL('19230212', 'female') % 2).toBe(0);
});

it('generator should produce not the same PESEL-s for the same date', () => {
  const date1 = '19231203';
  const pesel1 = generatePESEL(moment(date1), 'male');
  const pesel2 = generatePESEL(moment(date1), 'male');

  expect(pesel1).not.toEqual(pesel2);

  const date2 = '18540219';
  const pesel3 = generatePESEL(moment(date2), 'female');
  const pesel4 = generatePESEL(moment(date2), 'female');

  expect(pesel3).not.toEqual(pesel4);
});
