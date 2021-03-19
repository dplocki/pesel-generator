import moment from 'moment';
import { parseInput } from './parseInput';

const currentDate = moment.utc('20200302');

it('should recognize the empty value', () => {
  const [start, end] = parseInput('', currentDate);

  expect(start).isTheSame(currentDate);
  expect(end).isTheSame(currentDate);
});

it('should recognize the age in input', () => {
  const [start, end] = parseInput('12', currentDate);

  expect(start).isTheSame('20070302');
  expect(end).isTheSame('20080302');
});

it('should recognize the single year in input', () => {
  const [start, end] = parseInput('1922', currentDate);

  expect(start).isTheSame('19220101');
  expect(end).isTheSame('19221231');
});

it('should recognize the year and month in input', () => {
  const [start, end] = parseInput('1920/02', currentDate);

  expect(start).isTheSame('19200201');
  expect(end).isTheSame('19200229');
});

it('should recognize the full date input', () => {
  const [start, end] = parseInput('1920/03/02', currentDate);

  expect(start).isTheSame('19200302');
  expect(end).isTheSame('19200302');
});
