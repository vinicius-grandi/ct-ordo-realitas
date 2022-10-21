import {
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Simulation } from '../../pages/simulacao';
import customRender from '../utils/customRender';

describe('Simulation Page', () => {
  it('renders a battlefield where a player can fight against enemies', () => {
    customRender(<Simulation />);
    const title = screen.getByText(/simulacao\.title/i);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add new enemy',
    });

    const addPlayerBtn = screen.getByRole('button', {
      name: 'add new player',
    });

    expect(title).toBeInTheDocument();
    expect(addEnemyBtn).toBeInTheDocument();
    expect(addPlayerBtn).toBeInTheDocument();
  });

  it('allows to add a new player and enemy', async () => {
    customRender(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add new enemy',
    });
    const addPlayerBtn = screen.getByRole('button', {
      name: 'add new player',
    });
    // interacting with buttons
    fireEvent.click(addPlayerBtn);
    fireEvent.click(addEnemyBtn);

    // enemy and player should appear on the screen
    expect(screen.getByText('player1')).toBeInTheDocument();
    expect(screen.getByText('enemy1')).toBeInTheDocument();
  });

  it('shows a popup when a entity is clicked', async () => {
    customRender(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add new enemy',
    });

    fireEvent.click(addEnemyBtn);

    const enemy = screen.getByText('enemy1');
    fireEvent.click(enemy);
    expect(screen.getByText(/hpTab/i)).toBeInTheDocument();
    expect(screen.getByText(/shortcuts/i)).toBeInTheDocument();
    expect(screen.getByText(/notes/i)).toBeInTheDocument();
    expect(screen.getByText(/enemies/i)).toBeInTheDocument();
  });

  it('allows you roll dice', async () => {
    customRender(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add new enemy',
    });

    fireEvent.click(addEnemyBtn);

    const enemy = screen.getByText('enemy1');

    fireEvent.click(enemy);
    fireEvent.click(
      screen.getByRole('button', {
        name: 'add new shortcut',
      }),
    );

    const shortcutName = screen.getByPlaceholderText(/ex: agredir/i);
    const shortcutDice = screen.getByPlaceholderText(/ex: 2d6/i);

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
      name: 'add new enemy',
    });

    fireEvent.click(addEnemyBtn);

    const enemy = screen.getByText('enemy1');

    fireEvent.click(enemy);
    fireEvent.click(
      screen.getByRole('button', {
        name: 'add new shortcut',
      }),
    );

    const shortcutName = screen.getByPlaceholderText(/ex: agredir/i);
    const shortcutDice = screen.getByPlaceholderText(/ex: 2d6/i);

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
    fireEvent.click(screen.getByText('enemy1'));
    const attackBtn = screen.getByRole('button', {
      name: 'ATACAR',
    });
    expect(screen.getByText(/dano:/i)).toBeInTheDocument();

    fireEvent.click(attackBtn);
    expect(screen.getByDisplayValue(/-[0-9]/i)).toBeInTheDocument();
  });
  it('allows you to toggle between enemies and players and between entities', async () => {
    customRender(<Simulation />);
    const addEnemyBtn = screen.getByRole('button', {
      name: 'add new enemy',
    });
    const addPlayerBtn = screen.getByRole('button', {
      name: 'add new player',
    });

    fireEvent.click(addEnemyBtn);
    fireEvent.click(addEnemyBtn);
    fireEvent.click(addPlayerBtn);

    const enemy = screen.getByText('enemy1');
    fireEvent.click(enemy);

    const nextTargetBtn = screen.getByRole('button', {
      name: 'next target',
    });

    expect(nextTargetBtn).toBeInTheDocument();
    fireEvent.click(nextTargetBtn);
    screen.getByDisplayValue('enemy2');

    const prevTargetBtn = screen.getByRole('button', {
      name: 'previous target',
    });
    expect(prevTargetBtn).toBeInTheDocument();
    fireEvent.click(prevTargetBtn);
    screen.getByDisplayValue('enemy1');

    fireEvent.click(screen.getByText(/enemies/i));
    expect(screen.getByText(/players/i)).toBeInTheDocument();
    screen.getByDisplayValue('player1');
  });
});
