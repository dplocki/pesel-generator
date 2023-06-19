const { subDays, addMonths, addYears, subYears } = require('date-fns');

export function parseInput(dateOrAge, actualDate) {
  if (dateOrAge.length === 0) {
    return emptyInput(actualDate);
  }

  if (dateOrAge.length >= 4) {
    return dateFilter(dateOrAge);
  }

  return oldYearFilter(dateOrAge, actualDate);
}

function cleanDigits(value) {
  return value
    .split('/')
    .map(t => t.padStart(2, '0'))
    .reduce((p, t) => p + t);
}

function dateFilter(date) {
  const onlyDigits = cleanDigits(date);

  if (onlyDigits.length === 4) {
    // Missing day and month
    return onlyYear(parseInt(onlyDigits, 10));
  } else if (onlyDigits.length === 6) {
    // Missing day number
    const year = parseInt(onlyDigits.substring(0, 4), 10);
    const month = parseInt(onlyDigits.substring(4, 6), 10);
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = subDays(addMonths(start, 1), 1);

    return [start, end];
  } else if (onlyDigits.length === 8) {
    // Full date
    const year = parseInt(onlyDigits.substring(0, 4), 10);
    const month = parseInt(onlyDigits.substring(4, 6), 10);
    const day = parseInt(onlyDigits.substring(6, 8), 10);

    const result = new Date(Date.UTC(year, month - 1, day));
    return [result, result]
  }

  throw new Error('The input is not a date');
}

function oldYearFilter(age, actualDate) {
  const endDate = subYears(actualDate, age);

  return [
      subYears(endDate, 1),
      endDate
    ];
}

function onlyYear(year) {
  const start = new Date(Date.UTC(year, 0, 1, 0, 0 , 0, 0));
  const end = subDays(addYears(start, 1), 1);

  return [start, end]
}

const cloneDate = (date) => new Date(date.getTime());

function emptyInput(actualDate) {
  return [cloneDate(actualDate), cloneDate(actualDate)];
}
