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
    cy.findByText(/adicionar novo ritual/i).should('exist');
    cy.findByLabelText(/nome/i).as('ritual-name').should('exist');
    cy.findByLabelText(/tipo/i).as('ritual-type').should('exist');
    cy.findByLabelText(/imagem/i).as('ritual-image').should('exist');
    cy.findByRole('button', {
      name: 'upload',
    }).as('add-new-ritual-btn').should('exist');
    cy.get('@ritual-name').type('Cinerária');
    cy.get('@ritual-type').type('fear');
    cy.get('@ritual-image').selectFile('example-ritual.png');
    cy.get('@add-new-ritual-btn').click();
    cy.intercept('/api/rituais/adicionar', {
      imagePath: 'coolImagePath',
    });
    expect(api.setRitual).to.be.calledWith({
      name: 'Cinerária',
      imagePath: 'coolImagePath',
      type: 'fear',
    });
    cy.findByText(/ritual upload successful/i);
  });
});
