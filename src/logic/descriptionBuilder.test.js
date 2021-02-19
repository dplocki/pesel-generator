import { buildDescription } from './descriptionBuilder';
import { SignEnum } from './signEnum';
import { GenderEnum } from './genderEnum';

it('changing the dateOrAgeSign should not render text', () => {
  expect(buildDescription({
    dateOrAgeSign: SignEnum.Greater,
    dateOrAge: '',
    gender: GenderEnum.Any
  })).toBeNull();
});

it('render text for only females', () => {
  expect(buildDescription({
    dateOrAgeSign: SignEnum.Equal,
    dateOrAge: '',
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet');
});

it('render text for only male older than 23', () => {
  expect(buildDescription({
    dateOrAgeSign: SignEnum.Greater,
    dateOrAge: '23',
    gender: GenderEnum.Male
  })).toBe('Tylko PESEL-e mężczyzn mających więcej niż 23 lata');
});

it('render text for only females younger that one year', () => {
  expect(buildDescription({
    dateOrAgeSign: SignEnum.Lesser,
    dateOrAge: '1',
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet mających mniej niż rok');
});

it('render text for older or equal 34', () => {
  expect(buildDescription({
    dateOrAgeSign: SignEnum.Greater,
    dateOrAge: '34',
    gender: GenderEnum.Any
  })).toBe('Tylko PESEL-e osób mających więcej niż 34 lata');
});

it('render text for born after the provided year', () => {
  expect(buildDescription({
    dateOrAgeSign: SignEnum.Greater,
    dateOrAge: '1999',
    gender: GenderEnum.Any
  })).toBe('Tylko PESEL-e osób urodzonych po 1999 roku');
});

it('render text for born after the provided month and year', () => {
  expect(buildDescription({
    dateOrAgeSign: SignEnum.Lesser,
    dateOrAge: '5/1983',
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet urodzonych przed majem 1999 roku');
});

it('render text for born after the provided whole date', () => {
  expect(buildDescription({
    dateOrAgeSign: SignEnum.Equal,
    dateOrAge: '12/3/1983',
    gender: GenderEnum.Male
  })).toBe('Tylko PESEL-e mężczyzn urodzonych 3 marca 1983');
});
