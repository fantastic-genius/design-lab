import { render } from '@testing-library/react';
import Layout from './index';

test('Layout renders properly', () => {
  const { container } = render(<Layout />);
  expect(container).toMatchSnapshot();
});
