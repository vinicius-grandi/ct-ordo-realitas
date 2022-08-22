/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */
import React from 'react';
import Header from '../../components/Header';

it('renders learn react link', async () => {
  cy.mount(<Header />);
  cy.viewport(360, 640);
  cy.findByRole('banner').should('exist');
  cy.findByRole('menu').should('exist');
});
