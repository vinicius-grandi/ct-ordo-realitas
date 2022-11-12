import * as React from 'react';
import api from '@ct-ordo-realitas/app/firebase/clientApp';
import { AdminLogin } from '../../pages/admin/login';
import customMount from '../utils/customMount';

describe('Header', () => {
  beforeEach(() => {
    customMount(<AdminLogin />);
  });

  it('allows you to login when status code is 200', () => {
    cy.stub(api, 'loginAndGetToken').callsFake(() => Promise.resolve({
      user: 'vinum',
      status: 200,
    }));
    cy.findByText(/authentication/i).should('exist');
    cy.findByLabelText(/username/i).should('exist');
    cy.findByLabelText(/password/i).should('exist');
    cy.findByRole('button', {
      name: 'login',
    }).as('login-btn');
    cy.get('@login-btn').should('exist');
    cy.get('@login-btn').click();
    cy.get('@push').then((c) => expect(c).to.be.calledWith('/rituais/adicionar'));
  });
  it('sends a error message when the status code is different from 200', () => {
    cy.stub(api, 'loginAndGetToken').callsFake(() => Promise.resolve({
      idToken: null,
      status: 401,
    }));
    cy.findByText(/authentication/i).should('exist');
    cy.findByLabelText(/username/i).should('exist');
    cy.findByLabelText(/password/i).should('exist');
    cy.findByRole('button', {
      name: 'login',
    }).as('login-btn');
    cy.get('@login-btn').should('exist');
    cy.get('@login-btn').click();
    cy.findByText(/authentication failure/i);
  });
});
