/// <reference types="node" />
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Login } from '../../pages/login';

describe('Rituals API', () => {
  it('should let you login', async () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/passwordRecovery/i)).toBeInTheDocument();
    expect(screen.getByText(/signup/i)).toBeInTheDocument();
    expect(screen.getByText(/login\.loginBtn/i)).toBeInTheDocument();
    expect(screen.getByText(/login\.loginWith/i)).toBeInTheDocument();
  });
  it('shows password when you click "show password" button', async () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/);

    await user.type(passwordInput, 'coolPassword');
    expect(passwordInput).toHaveAttribute('type', 'password');

    // click show password btn
    await user.click(screen.getByRole('button', {
      name: /show password/ig,
    }));
    expect(passwordInput).toHaveAttribute('type', 'text');

    // click hide password btn
    await user.click(screen.getByRole('button', {
      name: /hide password/ig,
    }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
