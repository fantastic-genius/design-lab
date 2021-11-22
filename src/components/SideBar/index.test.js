import { render, screen } from '@testing-library/react';
import SideBar from './index';


test('Navbar contains 4 left menu', () => {
  render(<SideBar />);
  const sideMenu = screen.queryAllByTestId('side-menu');
  expect(sideMenu.length).toEqual(6);
});

test('Navbar contains add text menu', () => {
  render(<SideBar />);
  const addTextMenu = screen.getByText('Add Text');
  expect(addTextMenu).toBeInTheDocument();
});
