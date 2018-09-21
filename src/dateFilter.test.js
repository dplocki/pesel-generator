import moment from 'moment';
import { dateFilter } from './dateFilter';

it ('For full date filter return it', () => {
  expect(dateFilter('2019/03/04').isSame(moment('20190304'))).toBe(true);
});
