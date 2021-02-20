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

function dateToLabel(sign, value) {
  const meaningBrithLabel = {
    [SignEnum.Lesser]: 'przed ',
    [SignEnum.Equal]: '',
    [SignEnum.Greater]: 'po '
  }[sign];

  if (value.indexOf('/') === -1) {
    return meaningBrithLabel + value;
  }

  const monthLabels = {
    // numer, po, przed
    1: ['stycznia', 'styczniu', 'styczniem'],
    2: ['lutego', 'lutym', 'lutym'],
    3: ['marca', 'marcu', 'marcem'],
    4: ['kwietnia', 'kwietniu', 'kwietniem'],
    5: ['maja', 'maju', 'majem'],
    6: ['czerwca', 'czerwcu', 'czerwcem'],
    7: ['lipca', 'lipcu', 'lipcem'],
    8: ['sipernia', 'sierpniu', 'sierpniem'],
    9: ['września', 'wrześniu', 'wrześniem'],
    10: ['października', 'październiku', 'październikiem'],
    11: ['listopada', 'listopadzie', 'listopadem'],
    12: ['grudnia', 'grudniu', 'grudniem']
  };

  const tokens = value.split('/');
  if (tokens.length === 2) {
    const [month, year] = tokens;

    return {
      [SignEnum.Equal]: () => 'w ' + monthLabels[month][1],
      [SignEnum.Greater]: () => 'po ' + monthLabels[month][1],
      [SignEnum.Lesser]: () => 'przed ' + monthLabels[month][2],
    }[sign]() + ' ' + year;
  }

  const [day, month, year] = tokens;
  return `${meaningBrithLabel}${day} ${monthLabels[month][0]} ${year}`;
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
    return result + ' urodzonych ' + dateToLabel(options.dateOrAgeSign, options.dateOrAge) + ' roku';
  }

  const meaningLabel = {
    [SignEnum.Lesser]: 'mniej niż',
    [SignEnum.Equal]: 'dokładnie',
    [SignEnum.Greater]: 'więcej niż'
  }[options.dateOrAgeSign];

  return result + ' mających ' + meaningLabel + ' ' + yearNumberToLabel(parseInt(options.dateOrAge, 10))
}
