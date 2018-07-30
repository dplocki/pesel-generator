import { checkPESEL } from './pesel'

it('validation should reject PESEL without eleven digits', () => {
  expect(checkPESEL('')).toEqual(false);
  expect(checkPESEL('10310155')).toEqual(false);
  expect(checkPESEL('103101554011')).toEqual(false);
});

it('validation should check the control sum', () => {
  expect(checkPESEL('43031299215')).toEqual(false);
});

it('validation should show that PESEL is correct', () => {
  expect(checkPESEL('18271117189')).toEqual(true);
  expect(checkPESEL('10310155402')).toEqual(true);
});
