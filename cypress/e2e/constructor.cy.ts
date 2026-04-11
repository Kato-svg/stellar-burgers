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

  it('открывает главную страницу', () => {
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.contains('Соус Spicy-X').should('exist');
  });

  it('открывает модальное окно ингредиента', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.contains('Детали ингредиента').should('exist');
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');
  });

  it('закрывает модальное окно по клику на крестик', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-testid="modal-close"]').click();

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрывает модальное окно по клику на overlay', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-testid="modal-overlay"]').click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('добавляет ингредиент в конструктор', () => {
    cy.contains('Выберите начинку').should('exist');

    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .find('button')
      .click();

    cy.contains('Выберите начинку').should('not.exist');
  });

  it('создаёт заказ', () => {
    cy.contains('Краторная булка N-200i').parents('li').find('button').click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .find('button')
      .click();

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder');

    cy.contains('12345').should('exist');

    cy.get('[data-testid="modal-close"]').click();

    cy.contains('Выберите начинку').should('exist');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });
});
