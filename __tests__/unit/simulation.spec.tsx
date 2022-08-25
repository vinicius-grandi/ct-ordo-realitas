import { render, screen, waitFor } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
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

  it('allows to add a new player and enemy. The max number of entities is 6 on each side', async () => {
    render(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add-new-enemy',
    });
    const addPlayerBtn = screen.getByRole('button', {
      name: 'add-new-player',
    });

    // interacting with buttons
    await fireEvent.click(addPlayerBtn);
    await fireEvent.click(addEnemyBtn);

    // enemy and player should appear on the screen
    expect(screen.getByText('player')).toBeInTheDocument();
    expect(screen.getByText('enemy')).toBeInTheDocument();

    // adding more 5 players
    await waitFor(() => {
      const p = Array.from(Array(5)).map(async () => {
        await fireEvent.click(addPlayerBtn);
      });
      return Promise.all(p);
    });
    expect((await screen.findAllByText('player')).length).toBe(6);

    // when the max number is achieved, the button doesn't display
    expect((addPlayerBtn)).not.toBeInTheDocument();
  });

  it('shows a popup when a entity is clicked', async () => {
    render(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add-new-enemy',
    });

    await fireEvent.click(addEnemyBtn);

    const enemy = screen.getByText('enemy');

    await fireEvent.click(enemy);
    expect(screen.getByText(/pontos de vida/i)).toBeInTheDocument();
    expect(screen.getByText(/atalhos/i)).toBeInTheDocument();
    expect(screen.getByText(/notas/i)).toBeInTheDocument();
    expect(screen.getByText(/jogador/i)).toBeInTheDocument();
  });

  it('shows a popup when a entity is clicked', async () => {
    render(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add-new-enemy',
    });

    await fireEvent.click(addEnemyBtn);

    const enemy = screen.getByText('enemy');

    await fireEvent.click(enemy);
    await fireEvent.click(screen.getByRole('button', {
      name: 'add-new-shortcut',
    }));

    const shortcutName = screen.getByRole('textbox', {
      name: 'nome',
    });
    const shortcutDice = screen.getByRole('textbox', {
      name: 'dados',
    });
    const saveBtn = screen.getByRole('button', {
      name: 'salvar',
    });

    expect(shortcutName).toBeInTheDocument();
    expect(shortcutDice).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();

    // typing values
    await fireEvent.type(shortcutName, 'agredir');
    await fireEvent.type(shortcutDice, '2d6+10');

    expect(shortcutName).toHaveValue('agredir');
    expect(shortcutDice).toHaveValue('2d6+10');

    await fireEvent.click(saveBtn);

    expect(shortcutName).not.toBeInTheDocument();
    expect(shortcutDice).not.toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: 'rolar',
    })).toBeInTheDocument();
  });

  it('allows config import and export', () => {
    render(<Simulation />);
    const importBtn = screen.getByRole('button', {
      name: 'importar',
    });
    const exportBtn = screen.getByRole('button', {
      name: 'exportar',
    });
    expect(importBtn).toBeInTheDocument();
    expect(exportBtn).toBeInTheDocument();
  });
});
