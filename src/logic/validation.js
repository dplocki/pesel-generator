export function areOptionsValid(options) {
  if (typeof options.dateOrAge !== 'string' && typeof options.dateOrAgeSign !== 'number' && typeof options.gender !== 'number') {
    return false;
  }

  return !!options.dateOrAge.match(/^((\d{1,2}\/)?(\d{1,2}\/)?(\d{1,4})?|)$/);
}

export function isLogicCorrect(options) {
  if (options.dateOrAge.length === 0) {
    return true;
  }

  const match = options.dateOrAge.match(/^(\d{1,2}\/)?(\d{1,2}\/)?(\d{1,4})?$/);
  const yearOrAge = parseInt(match[3], 10);

  return yearOrAge < 100 || yearOrAge >= 1800 && yearOrAge < 2300;
}
