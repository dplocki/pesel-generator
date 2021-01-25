import React from 'react';
import ReactDOM from 'react-dom';
import GeneratorOptionsDescription from './GeneratorOptionsDescription';

let container;

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

it('renders default text on start', () => {
  ReactDOM.render(<GeneratorOptionsDescription />, container);
  const text = container.querySelector('.text-muted').textContent;
  expect(text).toBe('Dowolny PESEL');
});
