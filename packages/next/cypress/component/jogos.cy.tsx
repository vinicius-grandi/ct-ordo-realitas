import * as React from 'react';
import customMount from '../utils/customMount';
import { Jogos } from '../../pages/jogos';

describe('Header', () => {
  beforeEach(() => {
    customMount(<Jogos />);
  });

  it('creates a new room', () => {
    cy.findByRole('button', {
      name: /newRoom/i,
    }).click();
    cy.findByRole('textbox', {
      name: /roomName/i,
    }).type('cool');
    cy.findByRole('textbox', {
      name: /playerName/i,
    }).type('anfitras');
    cy.findByRole('checkbox', {
      name: /devilCoffins/,
    }).click();
    cy.findByRole('button', {
      name: /createRoom/i,
    });
  });
});
