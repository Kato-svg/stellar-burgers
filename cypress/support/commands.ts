/// <reference types="cypress" />

const selectors = {
  modalClose: '[data-testid="modal-close"]',
  modalOverlay: '[data-testid="modal-overlay"]'
};

Cypress.Commands.add('addIngredientByName', (name: string) => {
  cy.contains(name).parents('li').find('button').click();
});

Cypress.Commands.add('openIngredientModal', (name: string) => {
  cy.contains(name).click();
});

Cypress.Commands.add('closeModalByCross', () => {
  cy.get(selectors.modalClose).click();
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(selectors.modalOverlay).click({ force: true });
});
