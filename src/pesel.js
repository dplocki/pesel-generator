export function checkPESEL(pesel) {
  if (pesel.length !== 11) {
    return false;
  }

  const weights = [9, 7, 3, 1];

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += characterToDigit(pesel.charAt(i)) * weights[i % 4];
  }

  return sum % 10 === characterToDigit(pesel.charAt(10));
}

function characterToDigit(character) {
  return character - '0';
}