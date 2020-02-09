import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders UserForm', () => {
  render(<App />);
  const UserForm = screen.getByTestId('UserForm');
  expect(UserForm).toBeInTheDocument();
});

test('renders Output', () => {
  render(<App />);
  const Output = screen.getByTestId('Output');
  expect(Output).toBeInTheDocument();
});
