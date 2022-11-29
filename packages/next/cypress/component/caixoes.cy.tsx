import * as React from 'react';
import clearDatabases from '@ct-ordo-realitas/app/__tests__/utils/clearDatabases';
import { Caixoes } from '../../pages/jogos/caixoes';
import customMount from '../utils/customMount';

describe('Header', () => {
  beforeEach(() => {
    void clearDatabases();
    customMount(<Caixoes />);
  });

  it('creates a game where a player will be the "devil". After 3 minutes the devil can select 6 coffins and players inside them are gonna lose 1 point of existence. The game has 12 coffins, and each round increases the number of selected coffins by one', () => {
    cy.findByText(/uDevil/i).should('exist');
    cy.findByText(/timeRemaining/i).should('exist');
    cy.findByText(/existencePoints/i).should('exist');
    cy.findByText(/newDevil/i).should('exist');
    cy.findByText(/discussionTime/i).should('exist');
    cy.findByRole('textbox').as('chat');
    cy.get('@chat').type('hello');
    cy.findByRole('button', {
      name: /sendMessage/i,
    }).click();
    cy.findByText('hello').should('exist');
  });
});
