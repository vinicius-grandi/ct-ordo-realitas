/// <reference types="node" />
import { render, screen } from '@testing-library/react';
import { Login } from '../../pages/login';

describe('Rituals API', () => {
  it('should let you login', async () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/passwordRecovery/i)).toBeInTheDocument();
    expect(screen.getByText(/signup/i)).toBeInTheDocument();
    expect(screen.getByText(/login\.loginBtn/i)).toBeInTheDocument();
    expect(screen.getByText(/login\.loginWith/i)).toBeInTheDocument();
  });
});
