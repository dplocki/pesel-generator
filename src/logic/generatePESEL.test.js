import { generatePESEL } from './generatePESEL';
import { checkPESEL, characterToDigit } from './pesel';
import { GenderEnum } from './genderEnum';
import { parse } from 'date-fns';

const toDate = (excepted) => parse(excepted + ':000000', 'yyyyMMdd:HHmmss', new Date());

it('generated PESEL should have eleven digits', () => {
  expect(generatePESEL(toDate("20111031")).length).toBe(11);
  expect(generatePESEL(toDate("19770206")).length).toBe(11);
  expect(generatePESEL(toDate("20080823")).length).toBe(11);
  expect(generatePESEL(toDate("20051217")).length).toBe(11);
  expect(generatePESEL(toDate("20111112")).length).toBe(11);
});

it('generated PESEL from data range 1800 - 1899 should start with does number', () => {
  expect(generatePESEL(toDate("18001031")).substring(0, 6)).toBe('009031');
  expect(generatePESEL(toDate("18031031")).substring(0, 6)).toBe('039031');
  expect(generatePESEL(toDate("18740112")).substring(0, 6)).toBe('748112');
  expect(generatePESEL(toDate("18990412")).substring(0, 6)).toBe('998412');
});

it('generated PESEL from data range 1900 - 1999 should start with does number', () => {
  expect(generatePESEL(toDate("19001031")).substring(0, 6)).toBe('001031');
  expect(generatePESEL(toDate("19011031")).substring(0, 6)).toBe('011031');
  expect(generatePESEL(toDate("19740112")).substring(0, 6)).toBe('740112');
  expect(generatePESEL(toDate("19990412")).substring(0, 6)).toBe('990412');
});

it('generated PESEL from data range 2000 - 2099 should have 20 added to month number', () => {
  expect(generatePESEL(toDate("20111031")).substring(0, 6)).toBe('113031');
  expect(generatePESEL(toDate("20740112")).substring(0, 6)).toBe('742112');
  expect(generatePESEL(toDate("20991212")).substring(0, 6)).toBe('993212');
});

it('generated PESEL from data range 2100 - 2199 should have 40 added to month number', () => {
  expect(generatePESEL(toDate("21111031")).substring(0, 6)).toBe('115031');
  expect(generatePESEL(toDate("21740112")).substring(0, 6)).toBe('744112');
  expect(generatePESEL(toDate("21991212")).substring(0, 6)).toBe('995212');
});

it('generated PESEL from data range 2200 - 2299 should have 60 added to month number', () => {
  expect(generatePESEL(toDate("22111031")).substring(0, 6)).toBe('117031');
  expect(generatePESEL(toDate("22740112")).substring(0, 6)).toBe('746112');
  expect(generatePESEL(toDate("22991212")).substring(0, 6)).toBe('997212');
});

it('generated PESEL should be valid one', () => {
  const pesel = generatePESEL(toDate("20130412"));

  expect(checkPESEL(pesel)).toBe(true);
});

it('generated PESEL should have proper gender encoded', () => {
  function get10thDigitsOfGeneratedPESEL(date, gender) {
    const pesel = generatePESEL(toDate(date), gender);
    const _10thDigit = pesel.substring(10, 0);

    expect(pesel.length).toBe(11);

    return characterToDigit(_10thDigit);
  }

  expect(get10thDigitsOfGeneratedPESEL('19230212', GenderEnum.Male) % 2).toBe(1);
  expect(get10thDigitsOfGeneratedPESEL('19230212', GenderEnum.Female) % 2).toBe(0);
});

it('generator should produce not the same PESEL-s for the same date', () => {
  const date1 = '19231203';
  const pesel1 = generatePESEL(toDate(date1), GenderEnum.Male);
  const pesel2 = generatePESEL(toDate(date1), GenderEnum.Male);

  expect(pesel1).not.toEqual(pesel2);

  const date2 = '18540219';
  const pesel3 = generatePESEL(toDate(date2), GenderEnum.Female);
  const pesel4 = generatePESEL(toDate(date2), GenderEnum.Female);

  expect(pesel3).not.toEqual(pesel4);
});
