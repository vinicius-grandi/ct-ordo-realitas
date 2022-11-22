import { render, screen } from '@testing-library/react';
import { Fichas } from '../../pages/fichas';

describe('Home Page', () => {
  const sheets = [{
    vd: 0,
    imagePath: '',
    name: 'Arthur Cervero',
    for: 5,
    agi: 5,
    pre: 5,
    vig: 5,
    int: 5,
    token: 'asd',
    author: 'jaiminho',
  }];
  it("renders a card with sheet's info", async () => {
    render(<Fichas sheets={sheets} />);
    expect(screen.getByPlaceholderText(/Classe/i)).toBeInTheDocument();
    expect(screen.getByText(/sheets\.title/i)).toBeInTheDocument();
    expect(screen.getByText(/Arthur/i)).toBeInTheDocument();
    expect(screen.getByText(/for/i)).toBeInTheDocument();
    expect(screen.getByText(/agi/i)).toBeInTheDocument();
    expect(screen.getByText(/pre/i)).toBeInTheDocument();
    expect(screen.getByText(/vig/i)).toBeInTheDocument();
    expect(screen.getByText(/int/i)).toBeInTheDocument();
    expect(screen.getByText(/jaiminho/i)).toBeInTheDocument();
    expect(screen.getByText(/-vd/i)).toBeInTheDocument();
    expect(screen.getByText(/\+vd/i)).toBeInTheDocument();
  });
});
