import * as React from 'react';
import api from '@ct-ordo-realitas/app/firebase/clientApp';
import { AddNewRitual } from '../../pages/rituais/adicionar';
import customMount from '../utils/customMount';

describe('Header', () => {
  beforeEach(() => {
    customMount(<AddNewRitual />);
  });

  it('should let you create a new ritual if name and type length is greater than 0 and file is a png', () => {
    cy.stub(api, 'setRitual').callsFake(() => Promise.resolve());
    cy.intercept('adicionar', {
      fixture: 'example.json',
    }).as('image-upload');
    cy.findByText(/adicionar novo ritual/i).should('exist');
    cy.findByLabelText(/nome/i).type('Cinerária');
    cy.findByLabelText(/tipo/i).type('fear');
    cy.get('input[type=file]').selectFile('example-ritual.png');
    // image preview
    cy.get('img').should('exist');
    cy.findByRole('button', {
      name: 'salvar',
    }).click().then(() => {
      cy.findByText(/ritual upload successful/i);
    });
    cy.wait('@image-upload').then(() => expect(api.setRitual).to.be.called);
  });
  it('should not let you if you can\'t abide by the contract', () => {
    cy.stub(api, 'setRitual').callsFake(() => Promise.resolve());
    cy.intercept('adicionar', {
      fixture: 'example.json',
    }).as('image-upload');
    cy.findByText(/adicionar novo ritual/i).should('exist');
    cy.findByRole('button', {
      name: 'salvar',
    }).click().then(() => {
      cy.findByText(/please fill out all inputs/i);
    });
  });
});
