import { check_pesel } from './pesel'

it('validation should show that PESEL is correct', () => {
  expect(check_pesel('43031299214')).toEqual(true);
  expect(check_pesel('10310155402')).toEqual(true);
});

it('validation should show that PESEL is incorrect', () => {
  expect(check_pesel('')).toEqual(false);
  expect(check_pesel('10310155')).toEqual(false);
});
