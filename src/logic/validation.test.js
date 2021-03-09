import { GenderEnum } from "./genderEnum";
import { SignEnum } from "./signEnum";
import { areOptionsValid } from "./validation";

it('should return "false" for incorrect object', () => {
  expect(areOptionsValid({})).toBeFalsy();
  expect(areOptionsValid({ dateOrAge: 1 })).toBeFalsy();
  expect(areOptionsValid({ dateOrAgeSign: '1' })).toBeFalsy();
  expect(areOptionsValid({ gender: '1' })).toBeFalsy();
});

it('should return true for data without date or age input', () => {
  expect(areOptionsValid({
    dateOrAge: '',
    gender: GenderEnum.Any,
    dateOrAgeSign: SignEnum.Equal
  })).toBeTruthy();
});

it('should return false for incorrect date format', () => {
  expect(areOptionsValid({ dateOrAge: 'xcmvxcmv', gender: GenderEnum.Any, dateOrAgeSign: SignEnum.Equal })).toBeFalsy();
  expect(areOptionsValid({ dateOrAge: '23.23.232', gender: GenderEnum.Any, dateOrAgeSign: SignEnum.Equal })).toBeFalsy();
  expect(areOptionsValid({ dateOrAge: '1999.02.21', gender: GenderEnum.Any, dateOrAgeSign: SignEnum.Equal })).toBeFalsy();
  expect(areOptionsValid({ dateOrAge: '1999/02/21', gender: GenderEnum.Any, dateOrAgeSign: SignEnum.Equal })).toBeFalsy();
  expect(areOptionsValid({ dateOrAge: '232323', gender: GenderEnum.Any, dateOrAgeSign: SignEnum.Equal })).toBeFalsy();
});

it('should return true for correct date format', () => {
  expect(areOptionsValid({ dateOrAge: '10', gender: GenderEnum.Any, dateOrAgeSign: SignEnum.Equal })).toBeTruthy();
  expect(areOptionsValid({ dateOrAge: '1802', gender: GenderEnum.Any, dateOrAgeSign: SignEnum.Equal })).toBeTruthy();
  expect(areOptionsValid({ dateOrAge: '02/03/1945', gender: GenderEnum.Any, dateOrAgeSign: SignEnum.Equal })).toBeTruthy();
  expect(areOptionsValid({ dateOrAge: '02/2200', gender: GenderEnum.Any, dateOrAgeSign: SignEnum.Equal })).toBeTruthy();
});

it('should throw exception for incorrect date', () => {
  expect(() => areOptionsValid({
    dateOrAgeSign: SignEnum.Greater,
    dateOrAge: '1221',
    gender: GenderEnum.Male
  })).toThrow();
});
