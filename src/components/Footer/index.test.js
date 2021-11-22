import { render, screen } from '@testing-library/react';
import Footer from './index';


test('Footer contains Add Product text', () => {
  render(<Footer />);
  const add = screen.getByText('Add Products');
  expect(add).toHaveTextContent('Add Products');
});

test('Footer to contain four buttons', () => {
  render(<Footer />);
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toEqual(4);
});

test('Footer to contain a radio buttons', () => {
  render(<Footer />);
  const radio = screen.getByRole('radio');
  expect(radio).toBeVisible();
});
