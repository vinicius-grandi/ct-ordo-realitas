import * as React from 'react';
import api from '@ct-ordo-realitas/app/firebase/clientApp';
import { Rituals } from '../../pages/rituais';
import customMount from '../utils/customMount';

describe('Header', () => {
  beforeEach(() => {
    customMount(<Rituals />);
  });

  it('changes its content in lockstep with viewport width', () => {
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
