import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('State_renders the about page info', () => {
  render(<About />);
  expect(screen.getByText(/about this platform/i)).toBeInTheDocument();
  expect(screen.getByText(/enables you to support NGOs/i)).toBeInTheDocument();
  expect(screen.getByText(/the donation process works/i)).toBeInTheDocument();
});
