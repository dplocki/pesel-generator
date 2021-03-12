import moment from 'moment';

export function parseInput(dateOrAge, actualDate) {
  if (dateOrAge.length == 0) {
    return emptyInput();
  }

  if (dateOrAge.length >= 4) {
    return dateFilter(dateOrAge);
  }

  return oldYearFilter(dateOrAge, actualDate);
}

function dateFilter(date) {
  const onlyDigits = date.replace(/[^0-9]/g, '');

  if (onlyDigits.length === 4) {
    // Missing day and month
    return onlyYear(parseInt(onlyDigits, 10));
  } else if (onlyDigits.length === 6) {
    // Missing day number
    const newInput = onlyDigits + '01';
    const start = moment.utc(newInput);
    const end = start.clone().add(1, 'months').add(-1, 'days');

    return [start, end];
  } else if (onlyDigits.length === 8) {
    const result = moment.utc(onlyDigits);
    return [result, result]
  }

  return null;
}

function oldYearFilter(age, actualDate) {
  const years = -1 * age;
  return onlyYear(actualDate.clone().add(years, 'years').year());
}

function onlyYear(year) {
  const newInput = year + '0101';
  const start = moment.utc(newInput);
  const end = start.clone().add(1, 'years').add(-1, 'days');

  return [start, end]
}

function emptyInput(actualDate) {
  return [actualDate, actualDate];
}
