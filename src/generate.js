import { calculateControlDigit } from './pesel';

export function generatePESEL(date) {
  let result = date.format('YYMMDD') + '1234';

  result += calculateControlDigit(result).toString();

  return result;
}
