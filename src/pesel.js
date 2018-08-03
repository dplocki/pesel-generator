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

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += characterToDigit(pesel.charAt(i)) * weights[i % 4];
  }

  return sum % 10;
}
