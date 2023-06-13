import React from 'react';
import GeneratorOptions from './GeneratorOptions';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const root = createRoot(div);
  root.render(<GeneratorOptions />);

  root.unmount();
});
