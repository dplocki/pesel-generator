import momentRandom from 'moment-random';

export function oldYearFilter(dateOrAgeSign, dateOrAge, actualDate = null) {
  const dateShouldBe = (dateOrAgeSign === '>' || dateOrAgeSign === '<') ? dateOrAgeSign : '=';

  if (isNaN(dateOrAge)) {
    return null;
  }

  const years = -1 * parseInt(dateOrAge, 10);
  const birthDate = actualDate.clone().add(years, 'years');

  switch(dateShouldBe)
  {
    case '>':
      return momentRandom(birthDate);

    case '<':
      return momentRandom(actualDate, birthDate);

    default:
      return birthDate;
  }
}
