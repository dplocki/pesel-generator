import momentRandom from 'moment-random';
import { oldYearFilter } from './oldYearFilter';
import { dateFilter } from './dateFilter';

export function filterMerge(input) {
    if (!input) {
        return momentRandom();
    }

    if (input.length <= 2) {
        return oldYearFilter(input);
    }

    return dateFilter(input);
}
