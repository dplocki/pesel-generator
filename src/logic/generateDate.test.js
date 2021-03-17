import moment from 'moment';
import { generateDate, minimalPESELDate, maximumPESELDate } from './generateDate';
import { SignEnum } from './signEnum';

const startDate = moment.utc('1995-10-23');
const endDate = moment.utc('1995-12-24');

const momentRandomModuleMock = require('moment-random');
const isNumberOfParametersCorrect = () => momentRandomModuleMock.mock.calls[0].length == 2;
const theRangeFrom = () => momentRandomModuleMock.mock.calls[0][1];
const theRangeTo = () => momentRandomModuleMock.mock.calls[0][0];

jest.mock('moment-random');

beforeEach(() => {
  momentRandomModuleMock.mockClear();
});

it('Generate date in between given dates', () => {
  generateDate(SignEnum.Equal, startDate, endDate);

  expect(momentRandomModuleMock).toHaveBeenCalled();
  expect(isNumberOfParametersCorrect()).toBeTruthy();
  expect(theRangeFrom()).toBe(startDate);
  expect(theRangeTo()).toBe(endDate);
});

it('Generate date before first given date', () => {
  generateDate(SignEnum.Lesser, startDate, endDate);

  expect(momentRandomModuleMock).toHaveBeenCalled();
  expect(isNumberOfParametersCorrect()).toBeTruthy();
  expect(theRangeFrom()).toBe(minimalPESELDate);
  expect(theRangeTo()).toBe(startDate);
});

it('Generate date after first given date', () => {
  generateDate(SignEnum.Greater, startDate, endDate);

  expect(momentRandomModuleMock).toHaveBeenCalled();
  expect(isNumberOfParametersCorrect()).toBeTruthy();
  expect(theRangeFrom()).toBe(endDate);
  expect(theRangeTo()).toBe(maximumPESELDate);
});
