import { calculateControlDigit } from './pesel';

export function generatePESEL(date, gender = 'any') {
  const year = date.year();
  let result = date.format('YYMMDD');

  if (year > 1999 && year < 2100) {
    result = (parseInt(result, 10) + 2000).toString();
  } else if (year > 2099 && year < 2200) {
    result = (parseInt(result, 10) + 4000).toString();
  } else if (year > 2199) {
    result = (parseInt(result, 10) + 6000).toString();
  }

  result += '123' + generateDigitForGender(gender);
  result += calculateControlDigit(result).toString();

  return result;
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
