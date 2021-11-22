import { render } from '@testing-library/react';
import Home from './index';

test('Layout renders properly', () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
