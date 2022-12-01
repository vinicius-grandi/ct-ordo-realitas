describe('Header', () => {
  beforeEach(() => {
    cy.task('clearUsers');
    cy.task('clearDatabases');
  });

  it('creates a new room when authenticated', () => {
    cy.visit('/registro');
    cy.findByLabelText(/email/i).type('jaime@gmail.com');
    cy.findByLabelText(/senha/i).type('123456789');
    cy.findByRole('button', {
      name: /registrar/i,
    }).click();
    cy.url().should('not.contain', '/registro');
    cy.visit('/jogos');
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
    }).click();

    cy.url().should('contain', '/jogos/salas/cool');

    cy.findByText(/anfitras/i).should('exist');
    cy.findByText(/caixoes do diabo/).should('exist');
  });
});

export {};
