import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '../src/app/page';

// Snapshot Test for Home Component
describe('Home Page Snapshot', () => {
  it('renders the Home component unchanged', () => {
    const { container } = render(<Home />);

    // Snapshot the entire container
    expect(container).toMatchSnapshot();
  });
});
