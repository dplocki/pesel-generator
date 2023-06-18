import { parseInput } from './parseInput';
const parse = require('date-fns/parse');

const currentDate = new Date(2020, 2, 2);
const toDate = (excepted) => parse(excepted + ':000000', 'yyyyMMdd:HHmmss', new Date());


it('should recognize the empty value', () => {
  const [start, end] = parseInput('', currentDate);

  expect(start).toBeTheSameAs(currentDate);
  expect(end).toBeTheSameAs(currentDate);
});

it('should recognize the age in input', () => {
  const [start, end] = parseInput('12', currentDate);

  expect(start).toBeTheSameAs(toDate('20070302'));
  expect(end).toBeTheSameAs(toDate('20080302'));
});

it('should recognize the single year in input', () => {
  const [start, end] = parseInput('1922', currentDate);

  expect(start).toBeTheSameAs(toDate('19220101'));
  expect(end).toBeTheSameAs(toDate('19221231'));
});

it('should recognize the year and month in input', () => {
  const [start, end] = parseInput('1920/02', currentDate);

  expect(start).toBeTheSameAs(toDate('19200201'));
  expect(end).toBeTheSameAs(toDate('19200229'));
});

it('should recognize the full date input', () => {
  const [start, end] = parseInput('1920/03/02', currentDate);

  expect(start).toBeTheSameAs(toDate('19200302'));
  expect(end).toBeTheSameAs(toDate('19200302'));
});
