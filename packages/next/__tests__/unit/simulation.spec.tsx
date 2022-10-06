import {
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Simulation from '../../pages/simulacao';
import customRender from '../utils/customRender';

describe('Simulation Page', () => {
  it('renders a battlefield where a player can fight against enemies', () => {
    customRender(<Simulation />);
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

  it('allows to add a new player and enemy', async () => {
    customRender(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add-new-enemy',
    });
    const addPlayerBtn = screen.getByRole('button', {
      name: 'add-new-player',
    });
    // interacting with buttons
    fireEvent.click(addPlayerBtn);
    fireEvent.click(addEnemyBtn);

    // enemy and player should appear on the screen
    expect(screen.getByText('player')).toBeInTheDocument();
    expect(screen.getByText('enemy')).toBeInTheDocument();
  });

  it('shows a popup when a entity is clicked', async () => {
    customRender(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add-new-enemy',
    });

    fireEvent.click(addEnemyBtn);

    const enemy = screen.getByText('enemy');
    fireEvent.click(enemy);
    expect(screen.getByText(/pontos de vida/i)).toBeInTheDocument();
    expect(screen.getByText(/atalhos/i)).toBeInTheDocument();
    expect(screen.getByText(/notas/i)).toBeInTheDocument();
    expect(screen.getByText(/jogador/i)).toBeInTheDocument();
  });

  it('shows a popup when a entity is clicked', async () => {
    customRender(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add-new-enemy',
    });

    fireEvent.click(addEnemyBtn);

    const enemy = screen.getByText('enemy');

    fireEvent.click(enemy);
    fireEvent.click(
      screen.getByRole('button', {
        name: 'add-new-shortcut',
      }),
    );

    const shortcutName = screen.getByRole('textbox', {
      name: 'nome:',
    });
    const shortcutDice = screen.getByRole('textbox', {
      name: 'dados:',
    });

    expect(shortcutName).toBeInTheDocument();
    expect(shortcutDice).toBeInTheDocument();

    // typing values
    await waitFor(async () => {
      await userEvent.type(shortcutName, 'agredir');
      await userEvent.type(shortcutDice, '2d6+10');
    });

    const saveBtn = screen.getByRole('button', {
      name: 'salvar',
    });

    expect(saveBtn).toBeInTheDocument();

    expect(shortcutName).toHaveValue('agredir');
    expect(shortcutDice).toHaveValue('2d6+10');

    fireEvent.click(saveBtn);

    expect(shortcutName).not.toBeInTheDocument();
    expect(shortcutDice).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'rolar',
      }),
    ).toBeInTheDocument();
  });
  it('allows you select a target to deal damage', async () => {
    customRender(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add-new-enemy',
    });

    fireEvent.click(addEnemyBtn);

    const enemy = screen.getByText('enemy');

    fireEvent.click(enemy);
    fireEvent.click(
      screen.getByRole('button', {
        name: 'add-new-shortcut',
      }),
    );

    const shortcutName = screen.getByRole('textbox', {
      name: 'nome:',
    });
    const shortcutDice = screen.getByRole('textbox', {
      name: 'dados:',
    });

    expect(shortcutName).toBeInTheDocument();
    expect(shortcutDice).toBeInTheDocument();

    // typing values
    await waitFor(async () => {
      await userEvent.type(shortcutName, 'agredir');
      await userEvent.type(shortcutDice, '2d6+10');
    });
    const saveBtn = screen.getByRole('button', {
      name: 'salvar',
    });

    expect(shortcutName).toHaveValue('agredir');
    expect(shortcutDice).toHaveValue('2d6+10');
    expect(saveBtn).toBeInTheDocument();

    fireEvent.click(saveBtn);

    expect(shortcutName).not.toBeInTheDocument();
    expect(shortcutDice).not.toBeInTheDocument();
    const rollBtn = screen.getByRole('button', {
      name: 'rolar',
    });
    expect(rollBtn).toBeInTheDocument();
    fireEvent.click(rollBtn);

    const damageBtn = screen.getByText(/atacar um alvo/i);
    expect(damageBtn).toBeInTheDocument();

    fireEvent.click(damageBtn);

    // battlefield screen locked
    fireEvent.click(screen.getByText('enemy'));
    const attackBtn = screen.getByRole('button', {
      name: 'ATACAR',
    });
    fireEvent.click(attackBtn);
    expect(screen.getByDisplayValue(/-[0-9]/i)).toBeInTheDocument();
  });
});
