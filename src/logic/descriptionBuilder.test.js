

it('changin the dateOrAgeSign should not render text', () => {
  expect(getDescription({
    dateOrAgeSign: SignEnum.Greater,
    dateOrAge: 0,
    gender: GenderEnum.Any
  })).toBe('Dowolne PESEL-e');
});

it('render text for only females', () => {
  expect(getDescription({
    dateOrAgeSign: SignEnum.Equal,
    dateOrAge: 0,
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet');
});

it('render text for only male older than 23', () => {
  expect(getDescription({
    dateOrAgeSign: SignEnum.Greater,
    dateOrAge: 23,
    gender: GenderEnum.Male
  })).toBe('Tylko PESEL-e mężczyzn mających więcej niż 23 lata');
});

it('render text for only females younger that one year', () => {
  expect(getDescription({
    dateOrAgeSign: SignEnum.Lesser,
    dateOrAge: 1,
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet mających mniej niż rok');
});

it('render text for older or equal 34', () => {
  expect(getDescription({
    dateOrAgeSign: SignEnum.Greater,
    dateOrAge: 34,
    gender: GenderEnum.Any
  })).toBe('Tylko PESEL-e osób mających więcej niż 34 lata');
});
