import moment from 'moment';
import { generateDate } from './generateDate';
import { SignEnum } from './signEnum';

const startDate = moment('1995-12-23');
const endDate = moment('1995-12-24');
const actualDate = moment('2021-02-28');
const momentRandomModuleMock = require('moment-random');
jest.mock('moment-random');

beforeEach(() => {
  momentRandomModuleMock.mockClear();
});

it('Generate date in between given dates', () => {
  generateDate(SignEnum.Equal, startDate, endDate, actualDate);

  expect(momentRandomModuleMock).toHaveBeenCalled();
  expect(momentRandomModuleMock.mock.calls[0].length).toBe(2);
  expect(momentRandomModuleMock.mock.calls[0][0]).toBe(startDate);
  expect(momentRandomModuleMock.mock.calls[0][1]).toBe(endDate);
});

it('Generate date before first given date', () => {
  generateDate(SignEnum.Lesser, startDate, endDate, actualDate);

  expect(momentRandomModuleMock).toHaveBeenCalled();
  expect(momentRandomModuleMock.mock.calls[0].length).toBe(1);
  expect(momentRandomModuleMock.mock.calls[0][0]).toBe(endDate);
});

it('Generate date after first given date', () => {
  generateDate(SignEnum.Greater, startDate, endDate, actualDate);

  expect(momentRandomModuleMock).toHaveBeenCalled();
  expect(momentRandomModuleMock.mock.calls[0].length).toBe(2);
  expect(momentRandomModuleMock.mock.calls[0][0]).toBe(actualDate);
  expect(momentRandomModuleMock.mock.calls[0][1]).toBe(endDate);
});
