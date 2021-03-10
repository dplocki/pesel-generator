import React from 'react';
import ReactDOM from 'react-dom';
import { ERROR_TEXT, DEFAULT_TEXT, INCORRECT_YEAR_TEXT } from '../logic/descriptionBuilderTexts';
import { GenderEnum } from '../logic/genderEnum';
import { SignEnum } from '../logic/signEnum';
import GeneratorOptionsDescription from './GeneratorOptionsDescription';

const buildDescriptionModuleMock = require('../logic/descriptionBuilder');

jest.mock('../logic/descriptionBuilder');

let container;

function getDescription(options) {
  ReactDOM.render(<GeneratorOptionsDescription value={options} />, container);
  return container.querySelector('.text-muted').textContent;
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  buildDescriptionModuleMock.buildDescription.mockClear();
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', () => {
  ReactDOM.render(<GeneratorOptionsDescription />, container);
  ReactDOM.unmountComponentAtNode(container);

  expect(buildDescriptionModuleMock.buildDescription).not.toHaveBeenCalled();
});

it('renders with error text', () => {
  expect(getDescription(null)).toBe(ERROR_TEXT);

  expect(buildDescriptionModuleMock.buildDescription).not.toHaveBeenCalled();
});

it('should use the descriptionBuilder during the rendering', () => {
  getDescription({
    dateOrAgeSign: SignEnum.Equal,
    dateOrAge: '12',
    gender: GenderEnum.Any
  });

  expect(buildDescriptionModuleMock.buildDescription).toHaveBeenCalled();
});

it('should display error message if null is provided', () => {
  buildDescriptionModuleMock.buildDescription = jest.fn(() => { throw new Error() });

  const description = getDescription({
    dateOrAgeSign: SignEnum.Equal,
    dateOrAge: '????????????????',
    gender: GenderEnum.Any
  });

  expect(buildDescriptionModuleMock.buildDescription).toHaveBeenCalled();
  expect(description).toBe(ERROR_TEXT);
});

it('should display error message if inccorect year or age is provided', () => {
  buildDescriptionModuleMock.buildDescription = jest.fn(() => { throw new TypeError() });

  const description = getDescription({
    dateOrAgeSign: SignEnum.Equal,
    dateOrAge: '1111',
    gender: GenderEnum.Any
  });

  expect(buildDescriptionModuleMock.buildDescription).toHaveBeenCalled();
  expect(description).toBe(INCORRECT_YEAR_TEXT);
});
