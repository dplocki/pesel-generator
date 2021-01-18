import moment from 'moment';
import { oldYearFilter } from './oldYearFilter';

it('Providing years old should be calculate to date', () => {
  expect(oldYearFilter('12', moment('20181012')).isSame(moment('20061012'))).toBe(true);
  expect(oldYearFilter('=12', moment('20181012')).isSame(moment('20061012'))).toBe(true);
});

it('Providing more than years old should be calculate to proper birth date', () => {
  expect(oldYearFilter('<12', moment('20190410')).isAfter(moment('20070410'))).toBe(true);
});

it('Providing exact number of years old should be calculate to birth date', () => {
  expect(oldYearFilter('>12', moment('20190410')).isBefore(moment('20070410'))).toBe(true);
});

it('Providing incorrect years old should be return null', () => {
  expect(oldYearFilter('a')).toBe(null);
  expect(oldYearFilter('dkjnsdkjf')).toBe(null);
});
