// src/components/Button.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders the Button component with label', () => {
  render(<Button label="Click me" />);
  expect(screen.getByText(/click me/i)).toBeInTheDocument();
});
