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

function dateToLabel(value) {
  if (value.indexOf('/') === -1) {
    return value + ' roku'
  }
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

  if (options.dateOrAge.length >= 4) {
    const meaningBrithLabel = {
      [SignEnum.Lesser]: 'przed',
      [SignEnum.Equal]: '',
      [SignEnum.Greater]: 'po'
    }[options.dateOrAgeSign];

    return result + ' urodzonych ' + meaningBrithLabel + ' ' + dateToLabel(options.dateOrAge);
  }

  const meaningLabel = {
    [SignEnum.Lesser]: 'mniej niż',
    [SignEnum.Equal]: 'dokładnie',
    [SignEnum.Greater]: 'więcej niż'
  }[options.dateOrAgeSign];

  return result + ' mających ' + meaningLabel + ' ' + yearNumberToLabel(parseInt(options.dateOrAge, 10))
}
