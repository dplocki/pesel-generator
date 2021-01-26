import { filterMerge } from './filterMerge';
import { GenderEnum } from './genderEnum';

const dateFilterModule = require('./dateFilter');
const oldYearFilterModule = require('./oldYearFilter');

let dateFilterSpy = null;
let oldYearFilterSpy = null;

beforeEach(() => {
  dateFilterSpy = jest.spyOn(dateFilterModule, 'dateFilter');
  oldYearFilterSpy = jest.spyOn(oldYearFilterModule, 'oldYearFilter');
});

afterEach(() => {
  dateFilterSpy.mockRestore();
  oldYearFilterSpy.mockRestore();
});

it ('User enter more than characters than two, date filter should be called', () => {
  const result = filterMerge('1983');

  expect(dateFilterSpy).toHaveBeenCalled();
  expect(oldYearFilterSpy).not.toHaveBeenCalled();
  expect(result.date).not.toBeNull();
  expect(result.gender).toBe(GenderEnum.Any);
});

it ('User did not provide any input, none of the filters should be called', () => {
  const result = filterMerge(null);

  expect(dateFilterSpy).not.toHaveBeenCalled();
  expect(oldYearFilterSpy).not.toHaveBeenCalled();
  expect(result.date).not.toBeNull();
  expect(result.gender).toBe(GenderEnum.Any);
});

it ('User enter two digit and more than sign, year old filter should called', () => {
  const result = filterMerge('>12');

  expect(dateFilterSpy).not.toHaveBeenCalled();
  expect(oldYearFilterSpy).toHaveBeenCalled();
  expect(result.date).not.toBeNull();
  expect(result.gender).toBe(GenderEnum.Any);
});

it ('User enter two digit and less than sign, year old filter should called', () => {
  const result = filterMerge('<12');

  expect(dateFilterSpy).not.toHaveBeenCalled();
  expect(oldYearFilterSpy).toHaveBeenCalled();
  expect(result.date).not.toBeNull();
  expect(result.gender).toBe(GenderEnum.Any);
});

it ('User enter femal gender limit', () => {
  const result = filterMerge('f12');

  expect(result.date).not.toBeNull();
  expect(result.gender).toBe(GenderEnum.Female);
});

it ('User enter male gender limit', () => {
  const result = filterMerge('m12');

  expect(result.date).not.toBeNull();
  expect(result.gender).toBe(GenderEnum.Male);
});
