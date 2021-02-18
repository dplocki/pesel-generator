import React from 'react';
import ReactDOM from 'react-dom';
import GeneratorOptionsDescription from './GeneratorOptionsDescription';

let container;

function getDescription(options) {
  ReactDOM.render(<GeneratorOptionsDescription value={options} />, container);
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

  expect(getDescription(null)).toBe('Dowolne PESEL-e');
});

it('renders with default test', () => {
  expect(getDescription(null)).toBe('Dowolne PESEL-e');
});
