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

  result += randomThreeDigit();
  result += generateDigitForGender(gender);
  result += calculateControlDigit(result).toString();

  return result;
}

function generateDigitForGender(gender) {
  switch (gender) {
    case 'female':
    case 'male':
      const random = randomNumber(1, 5) * 2;

      if (gender === 'male') {
        return random + 1;
      } else {
        return random;
      }
  }

  return randomNumber(0, 9);
}

function addToMonth(dateString, howMuch) {
  const result = (parseInt(dateString, 10) + howMuch * 100).toString();

  if (dateString.startsWith('00')) {
    return '00' + result;
  }

  return result;
}

function randomThreeDigit() {
  return randomNumber(100, 999);
}

function randomNumber(min, max) {
  return Math.floor((Math.random() * max) + min);
}
