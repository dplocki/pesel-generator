import moment from 'moment';
import { oldYearFilter } from './oldYearFilter';

it('Providing years old should be calculate to date', () => {
  expect(oldYearFilter('12', moment('20181012')).isSame(moment('20061012'))).toBe(true);
});

it('Providing incorrect years old should be return null', () => {
  expect(oldYearFilter('a')).toBe(null);
  expect(oldYearFilter('dkjnsdkjf')).toBe(null);
  expect(oldYearFilter('1000')).toBe(null);
});
