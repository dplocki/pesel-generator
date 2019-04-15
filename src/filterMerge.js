import momentRandom from 'moment-random';
import { oldYearFilter } from './oldYearFilter';
import { dateFilter } from './dateFilter';
import { GenderEnum } from './genderEnum';

export function filterMerge(input) {
  const result = { date: null, gender: GenderEnum.Any };
  const inputRegex = /^(m|f|a)?(([><=])?(\d+))$/i;
  const match = inputRegex.exec(input);

  if (match) {
    if (match[2].length >= 4) {
      result.date = dateFilter(match[2]);
    } else {
      result.date = oldYearFilter(match[2]);
    }

    result.gender = readGenderInstruction(match[1]);
  } else {
    result.date = momentRandom();
  }

  return result;
}

function readGenderInstruction(symbol) {
  if (!symbol) {
    return GenderEnum.Any;
  }

  const letter = symbol[0].toLowerCase();
  if (letter === 'f') {
    return GenderEnum.Female;
  } else if (letter === 'm') {
    return GenderEnum.Male;
  } else {
    return GenderEnum.Any;
  }
}