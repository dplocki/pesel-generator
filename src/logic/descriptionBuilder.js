import { GenderEnum } from './genderEnum';
import { SignEnum } from './signEnum';

function yearNumberToLabel(value) {
  if (value === 1) {
    return 'rok';
  }

  if ((value < 10 || value > 20) && (value % 10) < 5) {
    return value + ' lata';
  }

  return value + ' lat';
}

export function buildDescription(options) {
  const isEmptyDateOrAge = options.dateOrAge.trim().length === 0;

  if (isEmptyDateOrAge && options.gender === GenderEnum.Any) {
    return null;
  }

  const genderLabel = {
    [GenderEnum.Male]: 'mężczyzn',
    [GenderEnum.Female]: 'kobiet',
    [GenderEnum.Any]: 'osób'
  }[options.gender];

  let result = `Tylko PESEL-e ${genderLabel}`;

  if (isEmptyDateOrAge) {
    return result;
  }

  const meaningLabel = {
    [SignEnum.Lesser]: 'mniej niż',
    [SignEnum.Equal]: 'dokładnie',
    [SignEnum.Greater]: 'więcej niż'
  }[options.dateOrAgeSign];

  return result + ' mających ' + meaningLabel + ' ' + yearNumberToLabel(parseInt(options.dateOrAge, 10))
}
