import { calculateControlDigit } from './pesel';

export function generatePESEL(date, gender = 'any') {
  const year = date.year();
  let result = date.format('YYMMDD');

  if (year > 1799 && year < 1900) {
    result = addToMonth(result, 80);
  } else if (year > 1999 && year < 2100) {
    result = addToMonth(result, 20);
  } else if (year > 2099 && year < 2200) {
    result = addToMonth(result, 40);
  } else if (year > 2199) {
    result = addToMonth(result, 60);
  }

  result += '123' + generateDigitForGender(gender);
  result += calculateControlDigit(result).toString();

  return result;

  function addToMonth(dateString, howMuch) {
    const result = (parseInt(dateString, 10) + howMuch * 100).toString();

    if (dateString.startsWith('00')) {
      return '00' + result;
    }

    return result;
  }
}

function generateDigitForGender(gender) {
  switch(gender) {
    case 'male':
      return '1';

    case 'female':
      return '2';
  }

  return '3';
}
