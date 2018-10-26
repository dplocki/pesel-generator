import { filterMerge } from './filterMerge';

const dateFilterModule = require('./dateFilter');
const oldYearFilterModule = require('./oldYearFilter');

const dateFilterSpy = jest.spyOn(dateFilterModule, 'dateFilter');
const oldYearFilterSpy = jest.spyOn(oldYearFilterModule, 'oldYearFilter');

it ('User enter two digit or less, year old filter should called', () => {
  var result = filterMerge('12');

  expect(dateFilterSpy).not.toHaveBeenCalled();
  expect(oldYearFilterSpy).toHaveBeenCalled();
  expect(result).not.toBeNull();
});

it ('User enter more than characters than two, date filter should be called', () => {
  var result = filterMerge('1983');

  expect(dateFilterSpy).toHaveBeenCalled();
  expect(oldYearFilterSpy).not.toHaveBeenCalled();
  expect(result).not.toBeNull();
});
