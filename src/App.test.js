import { render, screen } from '@testing-library/react';
import App from './App';

test('renders design lab menu', () => {
  render(<App />);
  const linkElement = screen.getByText(/Design Lab/i);
  expect(linkElement).toBeInTheDocument();
});
