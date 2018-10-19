import { filterMerge } from './filterMerge';

const dateFilterModule = require('./dateFilter');
const oldYearFilterModule = require('./oldYearFilter');

const dateFilterSpy = jest.spyOn(dateFilterModule, 'dateFilter');
const oldYearFilterSpy = jest.spyOn(oldYearFilterModule, 'oldYearFilter');

it ('User enter two digit or less, year old filter should called', () => {
  filterMerge('12');

  expect(dateFilterSpy).not.toHaveBeenCalled();
  expect(oldYearFilterSpy).toHaveBeenCalled();
});
