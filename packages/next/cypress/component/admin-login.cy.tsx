import * as React from 'react';
import api from '@ct-ordo-realitas/app/firebase/clientApp';
import { AdminLogin } from '../../pages/admin/login';
import customMount from '../utils/customMount';

describe('Header', () => {
  beforeEach(() => {
    customMount(<AdminLogin />);
  });

  it('allows lets you to login', () => {
    cy.stub(api, 'loginWithEmailAndPassword').callsFake(() => Promise.resolve({
      user: 'vinum',
      status: 200,
    }));
    cy.findByText(/authentication/i).should('exist');
    cy.findByLabelText(/username/i).should('exist');
    cy.findByLabelText(/password/i).should('exist');
  });
});
