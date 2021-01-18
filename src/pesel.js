import * as _ from "lodash-compat";

export function checkPESEL(pesel) {
  if (pesel.length !== 11) {
    return false;
  }

  return calculateControlDigit(pesel) === characterToDigit(pesel.charAt(10));
}

export function characterToDigit(character) {
  return character - '0';
}

export function calculateControlDigit(pesel) {
  const weights = [9, 7, 3, 1];

  return _.sum(
      _.take(pesel, 10)
      .map((c, i) => characterToDigit(c) * weights[i % 4])
    ) % 10;
}
