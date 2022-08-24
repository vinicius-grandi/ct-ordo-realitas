import { render, screen } from '@testing-library/react';
import Simulation from '../../pages/simulacao';

describe('Simulation Page', () => {
  it('renders a "battlefield" where a player can fight against enemies', () => {
    render(<Simulation />);
    const title = screen.getByText(/simulação/i);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add-new-enemy',
    });
    const addPlayerBtn = screen.getByRole('button', {
      name: 'add-new-player',
    });

    expect(title).toBeInTheDocument();
    expect(addEnemyBtn).toBeInTheDocument();
    expect(addPlayerBtn).toBeInTheDocument();
  });

  it('allows config import and export', () => {
    const importBtn = screen.getByRole('button', {
      name: 'import-config',
    });
    const exportBtn = screen.getByRole('button', {
      name: 'export-config',
    });
    expect(importBtn).toBeInTheDocument();
    expect(exportBtn).toBeInTheDocument();
  });
});
