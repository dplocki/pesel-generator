import React from 'react';
import { render } from '@testing-library/react'
import { ERROR_TEXT, INCORRECT_YEAR_TEXT } from '../logic/descriptionBuilderTexts';
import { GenderEnum } from '../logic/genderEnum';
import { SignEnum } from '../logic/signEnum';
import GeneratorOptionsDescription from './GeneratorOptionsDescription';

const buildDescriptionModuleMock = require('../logic/descriptionBuilder');

jest.mock('../logic/descriptionBuilder');

function getDescription(options) {
  const { container} = render(<GeneratorOptionsDescription value={options} />);

  return container.querySelector('.text-muted').textContent;
}

beforeEach(() => {
  buildDescriptionModuleMock.buildDescription.mockClear();
});

it('renders without crashing', () => {
  render(<GeneratorOptionsDescription />);

  expect(buildDescriptionModuleMock.buildDescription).not.toHaveBeenCalled();
});

it('renders with error text', () => {
  expect(getDescription(null)).toBe(ERROR_TEXT);

  expect(buildDescriptionModuleMock.buildDescription).not.toHaveBeenCalled();
});

it('should use the descriptionBuilder during the rendering', () => {
  getDescription({
    sign: SignEnum.Equal,
    dateOrAge: '12',
    gender: GenderEnum.Any
  });

  expect(buildDescriptionModuleMock.buildDescription).toHaveBeenCalled();
});

it('should display error message if null is provided', () => {
  buildDescriptionModuleMock.buildDescription = jest.fn(() => { throw new Error() });

  const description = getDescription({
    sign: SignEnum.Equal,
    dateOrAge: '????????????????',
    gender: GenderEnum.Any
  });

  expect(buildDescriptionModuleMock.buildDescription).toHaveBeenCalled();
  expect(description).toBe(ERROR_TEXT);
});

it('should display error message if incorrect year or age is provided', () => {
  buildDescriptionModuleMock.buildDescription = jest.fn(() => { throw new TypeError() });

  const description = getDescription({
    sign: SignEnum.Equal,
    dateOrAge: '1111',
    gender: GenderEnum.Any
  });

  expect(buildDescriptionModuleMock.buildDescription).toHaveBeenCalled();
  expect(description).toBe(INCORRECT_YEAR_TEXT);
});
