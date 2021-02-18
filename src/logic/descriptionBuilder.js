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
  if (options.dateOrAge === 0 && options.gender === GenderEnum.Any) {
    return DEFAULT_TEXT;
  }

  const genderLabel = {
    [GenderEnum.Male]: 'mężczyzn',
    [GenderEnum.Female]: 'kobiet',
    [GenderEnum.Any]: 'osób'
  }[options.gender];

  let result = `Tylko PESEL-e ${genderLabel}`;

  if (options.dateOrAge === 0) {
    return result;
  }

  const meaningLabel = {
    [SignEnum.Lesser]: 'mniej niż',
    [SignEnum.Equal]: 'dokładnie',
    [SignEnum.Greater]: 'więcej niż'
  }[options.dateOrAgeSign];

  return result + ' mających ' + meaningLabel + ' ' + yearNumberToLabel(options.dateOrAge)
}
