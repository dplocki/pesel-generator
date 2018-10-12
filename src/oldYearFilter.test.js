import moment from 'moment';
import { oldYearFilter } from './oldYearFilter';

it('Providing old should be calculate to date', () => {
  expect(oldYearFilter('12', moment('20181012')).isSame(moment('20061012'))).toBe(true);
});
