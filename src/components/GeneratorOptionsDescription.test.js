import React from 'react';
import ReactDOM from 'react-dom';
import { GenderEnum } from '../logic/genderEnum';
import GeneratorOptionsDescription from './GeneratorOptionsDescription';

let container;

function getDescription(options) {
  ReactDOM.render(<GeneratorOptionsDescription options={options} />, container);
  return container.querySelector('.text-muted').textContent;
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', () => {
  ReactDOM.render(<GeneratorOptionsDescription />, container);
  ReactDOM.unmountComponentAtNode(container);
});

it('renders with default test', () => {
  expect(getDescription(null)).toBe('Dowolne PESEL-e');
});

it('render text for only females', () => {
  expect(getDescription({
    yearOrAgeMeaning: '=',
    yearOrAge: null,
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet');
});

it('render text for only male older than 23', () => {
  expect(getDescription({
    yearOrAgeMeaning: '>',
    yearOrAge: 23,
    gender: GenderEnum.Male
  })).toBe('Tylko PESEL-e mężczyzn mających więcej niż 23 lata');
});

it('render text for only females younger that one year', () => {
  expect(getDescription({
    yearOrAgeMeaning: '<',
    yearOrAge: 1,
    gender: GenderEnum.Female
  })).toBe('Tylko PESEL-e kobiet mających mniej niż rok');
});

it('render text for older or equal 34', () => {
  expect(getDescription({
    yearOrAgeMeaning: '>=',
    yearOrAge: 34,
    gender: GenderEnum.Any
  })).toBe('Tylko PESEL-e osób mających co najmniej 34 lata');
});
