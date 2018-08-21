import { calculateControlDigit } from './pesel';

export function generatePESEL(date, gender = 'any') {
  let result = date.format('YYMMDD') + '123' + generateDigitForGender(gender);

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
