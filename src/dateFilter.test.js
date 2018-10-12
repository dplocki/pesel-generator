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
  expect(resultDate < moment('19850101')).toBe(true);
});

it ('For not whole numbers should return null', () => {
  expect(dateFilter('1')).toBe(null);
  expect(dateFilter('11')).toBe(null);
  expect(dateFilter('111')).toBe(null);
  expect(dateFilter('11111')).toBe(null);
  expect(dateFilter('1111111')).toBe(null);
  expect(dateFilter('111111111')).toBe(null);
});
