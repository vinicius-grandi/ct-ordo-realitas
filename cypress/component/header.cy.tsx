/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */
import React from 'react';
import Header from '../../components/Header';

describe('Header', () => {
  beforeEach(() => {
    cy.viewport(360, 640);
  });

  it('changes its content in lockstep with viewport width', () => {
    cy.mount(<Header />);
    cy.findByRole('banner').should('exist');
    cy.findByRole('button', {
      name: 'menu-button',
    }).should('exist');
    cy.viewport(1001, 640);
    cy.findByRole('button', {
      name: 'menu-button',
    }).should('not.exist');
  });
  it('expands the menu when on click', () => {
    cy.mount(<Header />);
    cy.findByRole('button', {
      name: 'menu-button',
    }).click();
    cy.get('ul').contains('ocultista');
  });
});
