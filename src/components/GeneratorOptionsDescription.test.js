import React from 'react';
import ReactDOM from 'react-dom';
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

it('renders with default test', () => {
  expect(getDescription(null)).toBe('Dowolne PESEL-e');

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
