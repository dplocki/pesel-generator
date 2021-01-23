import React from 'react';
import ReactDOM from 'react-dom';
import GeneratorOptionsDescription from './GeneratorOptionsDescription';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GeneratorOptionsDescription />, div);
  ReactDOM.unmountComponentAtNode(div);
});
