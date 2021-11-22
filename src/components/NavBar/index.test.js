import { render, screen } from '@testing-library/react';
import NavBar from './index';


test('Navbar contains 4 left menu', () => {
  render(<NavBar />);
  const rightMenu = screen.queryAllByTestId('top-lmenu');
  expect(rightMenu.length).toEqual(4);
});

test('Navbar contains 2 right menu', () => {
  render(<NavBar />);
  const rightMenu = screen.queryAllByTestId('top-rmenu');
  expect(rightMenu.length).toEqual(2);
});

test('Navbar logo to be visible', () => {
  render(<NavBar />);
  const logo = screen.getByAltText('SameDay Custom');
  expect(logo).toBeVisible();
});
