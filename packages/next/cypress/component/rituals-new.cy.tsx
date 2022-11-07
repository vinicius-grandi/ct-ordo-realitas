import * as React from 'react';
import api from '@ct-ordo-realitas/app/firebase/clientApp';
import { AddNewRitual } from '../../pages/rituais/adicionar';
import customMount from '../utils/customMount';

describe('Header', () => {
  beforeEach(() => {
    customMount(<AddNewRitual />);
  });

  it('creates a quiz using selected elements, when you get the answer right, the input become disabled', () => {
    cy.findByText(/blood/i).click();
    cy.findByText(/startQuiz/i).click();
    cy.stub(api, 'getRituals').callsFake(() => Promise.resolve([{
      data: () => ({
        imagePath: '',
        name: 'Cinerária',
        type: 'blood',
      }),
    }]));
    cy.findByPlaceholderText(/ritualPlaceholder/i).as('ritualInput');
    cy.get('@ritualInput').type('Cineraria');
    cy.get('@ritualInput').should('be.disabled');
    cy.findByText(/finishQuiz/i).click();
    cy.findByText(/score: 1\/1/i).should('exist');
  });
});
