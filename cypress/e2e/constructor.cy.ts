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

describe('constructor page', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.visit('/');
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
    cy.openIngredientModal(INGREDIENTS.bun);

    cy.contains(TEXT.ingredientDetails).should('exist');
    cy.contains(INGREDIENTS.bun).should('exist');
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');
  });

  it('закрывает модальное окно по клику на крестик', () => {
    cy.openIngredientModal(INGREDIENTS.bun);

    cy.contains(TEXT.ingredientDetails).should('exist');
    cy.closeModalByCross();

    cy.contains(TEXT.ingredientDetails).should('not.exist');
    cy.url().should('eq', 'http://localhost:4000/');
  });

  it('закрывает модальное окно по клику на overlay', () => {
    cy.openIngredientModal(INGREDIENTS.bun);

    cy.contains(TEXT.ingredientDetails).should('exist');
    cy.closeModalByOverlay();

    cy.contains(TEXT.ingredientDetails).should('not.exist');
    cy.url().should('eq', 'http://localhost:4000/');
  });

  it('добавляет ингредиент в конструктор', () => {
    cy.contains(TEXT.emptyFilling).should('exist');

    cy.addIngredientByName(INGREDIENTS.main);

    cy.contains(TEXT.emptyFilling).should('not.exist');
  });

  it('создаёт заказ и очищает конструктор', () => {
    cy.addIngredientByName(INGREDIENTS.bun);
    cy.addIngredientByName(INGREDIENTS.main);

    cy.contains(TEXT.orderButton).click();

    cy.wait('@createOrder');
    cy.contains(TEXT.orderNumber).should('exist');

    cy.closeModalByCross();

    cy.contains(TEXT.emptyFilling).should('exist');
    cy.contains(TEXT.emptyBuns).should('exist');
  });
});
