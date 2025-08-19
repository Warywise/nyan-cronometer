import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Nyan Catrometer title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Nyan Catrometer/i);
  expect(linkElement).toBeInTheDocument();
});
