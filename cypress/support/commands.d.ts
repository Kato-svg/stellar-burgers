/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredientByName(name: string): Chainable<void>;
      openIngredientModal(name: string): Chainable<void>;
      closeModalByCross(): Chainable<void>;
      closeModalByOverlay(): Chainable<void>;
    }
  }
}

export {};
