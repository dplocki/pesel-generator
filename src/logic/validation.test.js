import { GenderEnum } from "./genderEnum";
import { SignEnum } from "./signEnum";
import { areOptionsValid, isLogicCorrect } from "./validation";

it('should return "false" for incorrect object', () => {
  expect(areOptionsValid({})).toBeFalsy();
  expect(areOptionsValid({ dateOrAge: 1 })).toBeFalsy();
  expect(areOptionsValid({ sign: '1' })).toBeFalsy();
  expect(areOptionsValid({ gender: '1' })).toBeFalsy();
});

it('should return true for data without date or age input', () => {
  expect(areOptionsValid({ dateOrAge: '', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeTruthy();
});

it('should return false for incorrect date format', () => {
  expect(areOptionsValid({ dateOrAge: 'xcmvxcmv', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeFalsy();
  expect(areOptionsValid({ dateOrAge: '23.23.232', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeFalsy();
  expect(areOptionsValid({ dateOrAge: '1999.02.21', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeFalsy();
  expect(areOptionsValid({ dateOrAge: '02/03/1945', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeFalsy();
  expect(areOptionsValid({ dateOrAge: '232323', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeFalsy();
});

it('should return true for correct date format', () => {
  expect(areOptionsValid({ dateOrAge: '1', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeTruthy();
  expect(areOptionsValid({ dateOrAge: '20', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeTruthy();
  expect(areOptionsValid({ dateOrAge: '1802', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeTruthy();
  expect(areOptionsValid({ dateOrAge: '2200/02', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeTruthy();
  expect(areOptionsValid({ dateOrAge: '1945/3', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeTruthy();
  expect(areOptionsValid({ dateOrAge: '1999/02/21', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeTruthy();
  expect(areOptionsValid({ dateOrAge: '1999/02/1', gender: GenderEnum.Any, sign: SignEnum.Equal })).toBeTruthy();
});

it('should check the logic of date for incorrect data', () => {
  expect(isLogicCorrect({ sign: SignEnum.Greater, dateOrAge: '1221', gender: GenderEnum.Male })).toBeFalsy();
  expect(isLogicCorrect({ sign: SignEnum.Greater, dateOrAge: '111', gender: GenderEnum.Male })).toBeFalsy();
  expect(isLogicCorrect({ sign: SignEnum.Greater, dateOrAge: '1992/23', gender: GenderEnum.Male })).toBeFalsy();
  expect(isLogicCorrect({ sign: SignEnum.Greater, dateOrAge: '1992/02/41', gender: GenderEnum.Male })).toBeFalsy();
});

it('should check the logic of date for correct data', () => {
  expect(isLogicCorrect({ sign: SignEnum.Greater, dateOrAge: '1992', gender: GenderEnum.Male })).toBeTruthy();
  expect(isLogicCorrect({ sign: SignEnum.Greater, dateOrAge: '20', gender: GenderEnum.Male })).toBeTruthy();
});
