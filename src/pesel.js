import * as _ from "lodash-compat";

const CORRECT_PESEL_SIZE = 11;
const MEANING_PESEL_NUMBERS = 10;

export function checkPESEL(pesel) {
  if (pesel.length !== CORRECT_PESEL_SIZE) {
    return false;
  }

  return calculateControlDigit(pesel) === characterToDigit(pesel.charAt(MEANING_PESEL_NUMBERS));
}

export function characterToDigit(character) {
  return character - '0';
}

export function calculateControlDigit(pesel) {
  const weights = [9, 7, 3, 1];
  const weightCount = weights.length;

  return _.sum(
      _.take(pesel, MEANING_PESEL_NUMBERS)
       .map((c, i) => characterToDigit(c) * weights[i % weightCount])
    ) % 10;
}
