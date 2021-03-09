export function areOptionsValid(options) {
  if (typeof options.dateOrAge !== 'string' && typeof options.dateOrAgeSign !== 'number' && typeof options.gender !== 'number') {
    return false;
  }

  if (options.dateOrAge.trim().length === 0) {
    return true;
  }

  const match = options.dateOrAge.match(/^(\d{1,2}\/)?(\d{1,2}\/)?(\d{1,4})?$/);
  if (!match) {
    return false;
  }

  const yearOrAge = parseInt(match[3], 10);
  if (yearOrAge < 100 || yearOrAge >= 1800 && yearOrAge < 2300) {
    return true;
  }

  throw TypeError('Incorrect year or age');
}
