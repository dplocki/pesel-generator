const pattern = /^([1-9]\d{0,3})(?:\/([1-9]{1,2}|0\d))?(?:\/([1-9]{1,2}|0\d))?$/;

export function areOptionsValid(options) {
  if (!options
      || typeof options.dateOrAge !== 'string'
      || typeof options.sign !== 'number'
      || typeof options.gender !== 'number') {
    return false;
  }

  return options.dateOrAge.length === 0 || options.dateOrAge.match(pattern);
}

export function isLogicCorrect(options) {
  if (options.dateOrAge.length === 0) {
    return true;
  }

  const match = options.dateOrAge.match(pattern);
  const yearOrAge = parseInt(match[1], 10);
  const month = match[2] ? parseInt(match[2], 10) : 1;

  return (yearOrAge < 100 || yearOrAge >= 1800 && yearOrAge < 2300)
    && month >= 1 && month <= 12
    && !(match[3] ? isNaN(Date.parse(match[0])) : false);
}
