import moment from 'moment';
import { parseInput } from './parseInput';

const currentDate = moment.utc('20200302');

expect.extend({
  isTheSame(received, excepted) {
    const momentExcepted = moment.utc(excepted);
    if (received.isValid() && received.isSame(momentExcepted)) {
      return { pass: true, message: () => received.toString() };
    }

    return { pass: false, message: () => `Date don't match\n\nReceived: ${received}\nExpected: ${momentExcepted}` };
  }
});

it('should recognize the age in input', () => {
  const [start, end] = parseInput('12', currentDate);

  expect(start).isTheSame('20080101');
  expect(end).isTheSame('20081231');
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
