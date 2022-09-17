import Footer from '@components/Footer';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
  it('renders a footer with info about donation', () => {
    render(<Footer />);
    const paragraph = screen.getByText(/apoie-me/i);
    expect(paragraph).toBeInTheDocument();
  });
});
