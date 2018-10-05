import moment from 'moment';
import { dateFilter } from './dateFilter';

it ('For full date filter return it', () => {
  expect(dateFilter('2019/03/04').isSame(moment('20190304'))).toBe(true);
  expect(dateFilter('1992/11/12').isSame(moment('19921112'))).toBe(true);
});

it ('For missing day number date should generate in range', () => {
  const resultDate = dateFilter('2012/03');

  expect(resultDate >= moment('20120301')).toBe(true);
  expect(resultDate < moment('20120401')).toBe(true);
});

it ('For missing day and month number date should generate in range', () => {
  const resultDate = dateFilter('1984');

  expect(resultDate >= moment('19840101')).toBe(true);
  expect(resultDate < moment('19840101')).toBe(true);
});
