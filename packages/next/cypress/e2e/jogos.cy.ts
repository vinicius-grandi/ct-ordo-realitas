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
    cy.url({
      timeout: 10000,
    }).should('not.contain', '/registro');
    cy.visit('/jogos');
    cy.findByRole('button', {
      name: /nova sala/i,
    }).click();
    cy.findByRole('textbox', {
      name: /nome/i,
    }).type('cool');
    cy.findByLabelText(/jogador/i).type('anfitras');
    cy.findByRole('checkbox', {
      name: /caixões do diabo/i,
    }).click();
    cy.findByRole('button', {
      name: /criar sala/i,
    }).click();

    cy.url({
      timeout: 10000,
    }).should('contain', '/jogos/salas/cool');

    cy.findByText(/anfitras/i).should('exist');
    cy.findByText(/caixões do diabo/i).should('exist');
  });

  it('joins an already created room', () => {
    cy.task('createRoom');

    cy.visit('/registro');
    cy.findByLabelText(/email/i).type('jaime@gmail.com');
    cy.findByLabelText(/senha/i).type('123456789');
    cy.findByRole('button', {
      name: /registrar/i,
    }).click();

    cy.url({
      timeout: 10000,
    }).should('not.contain', '/registro');
    cy.visit('/jogos');

    cy.findByRole('button', {
      name: /entrar/i,
    }).click();

    cy.findByLabelText(/jogador/i).type('guest');
    cy.findByRole('link', {
      name: /confirmar/i,
    }).click();
    cy.url({
      timeout: 10000,
    }).should('contain', 'salas');
    cy.get('li').should('have.length', 2);
  });
});

export {};
