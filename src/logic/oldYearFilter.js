import moment from 'moment';
import momentRandom from 'moment-random';

export function oldYearFilter(input, actualDate = null) {
  const today = actualDate || moment();
  const dateShouldBe = (input[0] === '>' || input[0] === '<') ? input[0] : '=';
  const numericYears = (input[0] === '>' || input[0] === '<' || input[0] === '=') ? input.substring(1) : input;

  if (isNaN(numericYears)) {
    return null;
  }

  const years = -1 * parseInt(numericYears, 10);
  const birthDate = today.clone().add(years, 'years');

  switch(dateShouldBe)
  {
    case '>':
      return momentRandom(birthDate);

    case '<':
      return momentRandom(today, birthDate);

    default:
      return birthDate;
  }
}
