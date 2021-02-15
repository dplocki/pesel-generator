import { generateDate } from './filterMerge';

const oldYearFilterModuleMock = require("./oldYearFilter");
const dateFilterModuleMock = require("./dateFilter");

jest.mock('./oldYearFilter');
jest.mock('./dateFilter');

beforeEach(() => {
  oldYearFilterModuleMock.oldYearFilter.mockClear();
  dateFilterModuleMock.dateFilter.mockClear();
});

it ('User enter more than characters than two, date filter should be called', () => {
  generateDate(null, '1983', null);

  expect(dateFilterModuleMock.dateFilter).toHaveBeenCalled();
  expect(oldYearFilterModuleMock.oldYearFilter).not.toHaveBeenCalled();
});

it ('User enter no more than two characters, oldYearFilter should be called', () => {
  generateDate(null, '', null);
  generateDate(null, '12', null);

  expect(dateFilterModuleMock.dateFilter).not.toHaveBeenCalled();
  expect(oldYearFilterModuleMock.oldYearFilter).toHaveBeenCalled();
});
