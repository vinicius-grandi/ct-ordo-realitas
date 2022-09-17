import { render, screen } from '@testing-library/react';
import Home from '../../pages';

describe('Home Page', () => {
  it('renders the initial page from the website', () => {
    render(<Home />);

    const title = screen.getByText(/boas vindas/i);
    const text = screen.getByText(/Bem vindo/i);

    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
