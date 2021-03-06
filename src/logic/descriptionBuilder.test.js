import { buildDescription } from './descriptionBuilder';
import { SignEnum } from './signEnum';
import { GenderEnum } from './genderEnum';

it('render "default" text for default values', () => {
  expect(buildDescription({
    sign: SignEnum.Equal,
    dateOrAge: '',
    gender: GenderEnum.Any
  })).toBeNull();
});

it('render text for people born in the future', () => {
  expect(buildDescription({
    sign: SignEnum.Greater,
    dateOrAge: '',
    gender: GenderEnum.Any
  })).toBe('Tylko PESEL-e osób jeszcze nieurodzonych');
});

it('render text for men born in the past', () => {
  expect(buildDescription({
    sign: SignEnum.Lesser,
    dateOrAge: '',
    gender: GenderEnum.Male
  })).toBe('Tylko PESEL-e mężczyzn już urodzonych');
});

it('render text for women born in the past', () => {
  expect(buildDescription({
    sign: SignEnum.Greater,
    dateOrAge: '',
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet jeszcze nieurodzonych');
});

it('render text for only females', () => {
  expect(buildDescription({
    sign: SignEnum.Equal,
    dateOrAge: '',
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet');
});

it('render text for only male older than 23', () => {
  expect(buildDescription({
    sign: SignEnum.Greater,
    dateOrAge: '23',
    gender: GenderEnum.Male
  })).toBe('Tylko PESEL-e mężczyzn mających więcej niż 23 lata');
});

it('render text for only females younger that one year', () => {
  expect(buildDescription({
    sign: SignEnum.Lesser,
    dateOrAge: '1',
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet mających mniej niż rok');
});

it('render text for older or equal 34', () => {
  expect(buildDescription({
    sign: SignEnum.Greater,
    dateOrAge: '34',
    gender: GenderEnum.Any
  })).toBe('Tylko PESEL-e osób mających więcej niż 34 lata');
});

it('render text for born after the provided year', () => {
  expect(buildDescription({
    sign: SignEnum.Greater,
    dateOrAge: '1999',
    gender: GenderEnum.Any
  })).toBe('Tylko PESEL-e osób urodzonych po 1999 roku');
});

it('render text for women born before the provided month and year', () => {
  expect(buildDescription({
    sign: SignEnum.Lesser,
    dateOrAge: '1983/5',
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet urodzonych przed majem 1983 roku');
});

it('render text for men born after the provided month and year', () => {
  expect(buildDescription({
    sign: SignEnum.Greater,
    dateOrAge: '1934/03',
    gender: GenderEnum.Male
  })).toBe('Tylko PESEL-e mężczyzn urodzonych po marcu 1934 roku');
});

it('render text for male born in the provided whole date', () => {
  expect(buildDescription({
    sign: SignEnum.Equal,
    dateOrAge: '1983/3/12',
    gender: GenderEnum.Male
  })).toBe('Tylko PESEL-e mężczyzn urodzonych 12 marca 1983 roku');
});

it('render text for males born after the provided whole date', () => {
  expect(buildDescription({
    sign: SignEnum.Greater,
    dateOrAge: '2001/4/02',
    gender: GenderEnum.Male
  })).toBe('Tylko PESEL-e mężczyzn urodzonych po 2 kwietnia 2001 roku');
});

it('incase of problem, should throw an error', () => {
  expect(() => buildDescription({})).toThrow();
});

it('incase of incorrect year, it should throw an error', () => {
  expect(() => buildDescription({
    sign: SignEnum.Greater,
    dateOrAge: '1221',
    gender: GenderEnum.Male
  })).toThrow();
});
