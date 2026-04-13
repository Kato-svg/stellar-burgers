/// <reference types="cypress" />

const INGREDIENTS = {
  bun: 'Краторная булка N-200i',
  main: 'Биокотлета из марсианской Магнолии',
  sauce: 'Соус Spicy-X'
};

const TEXT = {
  ingredientDetails: 'Детали ингредиента',
  emptyFilling: 'Выберите начинку',
  emptyBuns: 'Выберите булки',
  orderButton: 'Оформить заказ',
  orderNumber: '12345'
};

const SELECTORS = {
  modalClose: '[data-testid="modal-close"]',
  modalOverlay: '[data-testid="modal-overlay"]'
};

describe('constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      }
    });

    cy.setCookie('accessToken', 'test-access-token');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });

  it('открывает главную страницу', () => {
    cy.contains(INGREDIENTS.bun).should('exist');
    cy.contains(INGREDIENTS.main).should('exist');
    cy.contains(INGREDIENTS.sauce).should('exist');
  });

  it('открывает модальное окно ингредиента и показывает данные выбранного ингредиента', () => {
    cy.contains(INGREDIENTS.bun).click();

    cy.contains(TEXT.ingredientDetails).should('exist');
    cy.contains(INGREDIENTS.bun).should('exist');
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');
  });

  it('закрывает модальное окно по клику на крестик', () => {
    cy.contains(INGREDIENTS.bun).click();

    cy.contains(TEXT.ingredientDetails).should('exist');
    cy.get(SELECTORS.modalClose).click();

    cy.contains(TEXT.ingredientDetails).should('not.exist');
    cy.url().should('eq', 'http://localhost:4000/');
  });

  it('закрывает модальное окно по клику на overlay', () => {
    cy.contains(INGREDIENTS.bun).click();

    cy.contains(TEXT.ingredientDetails).should('exist');
    cy.get(SELECTORS.modalOverlay).click({ force: true });

    cy.contains(TEXT.ingredientDetails).should('not.exist');
    cy.url().should('eq', 'http://localhost:4000/');
  });

  it('добавляет ингредиент в конструктор', () => {
    cy.contains(TEXT.emptyFilling).should('exist');

    cy.contains(INGREDIENTS.main).parents('li').find('button').click();

    cy.contains(TEXT.emptyFilling).should('not.exist');
  });

  it('создаёт заказ и очищает конструктор', () => {
    cy.contains(INGREDIENTS.bun).parents('li').find('button').click();

    cy.contains(INGREDIENTS.main).parents('li').find('button').click();

    cy.contains(TEXT.orderButton).click();

    cy.wait('@createOrder');
    cy.contains(TEXT.orderNumber).should('exist');

    cy.get(SELECTORS.modalClose).click();

    cy.contains(TEXT.emptyFilling).should('exist');
    cy.contains(TEXT.emptyBuns).should('exist');
  });
});
