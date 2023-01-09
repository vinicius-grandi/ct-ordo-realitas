import * as React from 'react';
import Header from '../../components/Header';
import customMount from '../utils/customMount';

describe('Header', () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    customMount(<Header />);
  });

  it('changes its content in lockstep with viewport width', () => {
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
    cy.findByRole('button', {
      name: 'menu-button',
    }).click();
    cy.get('ul').contains('ocultista');
  });
});
