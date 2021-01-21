import React from 'react';
import ReactDOM from 'react-dom';
import GeneratorOptions from './GeneratorOptions';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GeneratorOptions />, div);
  ReactDOM.unmountComponentAtNode(div);
});
