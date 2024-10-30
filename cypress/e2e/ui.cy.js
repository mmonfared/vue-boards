/// <reference types="Cypress" />
import { generateRandomIdentity } from '../support/utils';

beforeEach(() => {
  // Test cleanup
  cy.request('POST', '/api/reset');
});

describe('get started page opens', () => {
  it('opens the page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="first-board"]').should('have.attr', 'placeholder', 'Name of your first board');
  });
});

//Start writing your tests here:
it('Signup', () => {
  let identity = generateRandomIdentity();
  cy.visit('/signup');
  cy.get('[data-cy="signup-email"]').type(identity.email);
  cy.get('[data-cy="signup-password"]').type(identity.password);
  cy.intercept('POST', '/api/signup').as('signUpInterceptor');
  cy.get('[data-cy="signup-submit"]').click();
  cy.wait('@signUpInterceptor').then((signUpRequest) => {
    expect(signUpRequest.request.body).to.have.ownProperty('email', identity.email);
    expect(signUpRequest.request.body).to.have.ownProperty('password', identity.password);
    expect(signUpRequest.response.statusCode).to.equal(201);
    cy.contains('Get started!');
    cy.get('[data-cy="first-board"]').should('have.attr', 'placeholder', 'Name of your first board');
  });
});

it('Login', () => {
  let identity = generateRandomIdentity();
  cy.addNewUser(identity.email, identity.password).then((response) => {
    cy.visit('/login');
    cy.get('[data-cy="login-email"]').type(identity.email);
    cy.get('[data-cy="login-password"]').type(identity.password);
    cy.intercept('POST', '/api/login').as('loginInterceptor');
    cy.get('[data-cy="login-submit"]').click();
    cy.wait('@loginInterceptor').then((loginRequest) => {
      expect(loginRequest.request.body).to.have.ownProperty('email', identity.email);
      expect(loginRequest.request.body).to.have.ownProperty('password', identity.password);
      expect(loginRequest.response.statusCode).to.equal(200);
      expect(loginRequest.response.body).to.have.ownProperty('accessToken');
      cy.contains('Get started!');
      cy.get('[data-cy="first-board"]').should('have.attr', 'placeholder', 'Name of your first board');
    });
  });
});

it('Smoke Test', () => {
  let identity = generateRandomIdentity();
  cy.addNewUser(identity.email, identity.password).then(() => {
    cy.visit('/login');
    cy.get('[data-cy="login-email"]').type(identity.email);
    cy.get('[data-cy="login-password"]').type(identity.password);
    cy.intercept('POST', '/api/login').as('loginInterceptor');
    cy.get('[data-cy="login-submit"]').click();
    cy.wait('@loginInterceptor');
  });
  // Add board 
  cy.get('[data-cy="first-board"]').type('New Board{enter}');
  cy.get('[data-cy="board-title"]').prev().should('have.text', 'New Board');
  // Rename board
  cy.get('[data-cy="board-title"]').clear().type('Renamed Board{enter}');
  cy.get('[data-cy="board-title"]').prev().should('have.text', 'Renamed Board');
  // Click the star
  cy.get('[data-cy="star"]').eq(0).click().should('have.class', 'text-yellow-300');
  // Add list
  cy.get('[data-cy="create-list"]').click();
  cy.get('[data-cy="add-list-input"]').should('have.attr', 'placeholder', 'Enter list title...').type('List Title{enter}');
  cy.get('[data-cy="list-name"]').should('have.value', 'List Title');
  // Add card
  cy.get('[data-cy="new-card"]').click();
  cy.get('[data-cy="new-card-input"]').type('New card details{enter}');
  cy.get('[data-cy="card-text"]').should('have.text', 'New card details');
  // Open card
  cy.get('[data-cy="card"]').click();
  // Choose due date in the next week depending on the current date
  cy.get('[data-cy="calendar-dropdown"]').click();
  cy.get('[aria-selected="true"]')
    .nextAll()
    .then((elements) => {
      if (elements.length > 6) { // check if we are not in the last week of the month
        cy.wrap(elements[5]).click();
      } else {
        cy.get('[aria-label="Next month"]').click();
        cy.get('[aria-selected="true"]')
          .parent()
          .next()
          .within(() => {
            cy.get('.dp__calendar_item').eq(2).click();
          });
      }
    });
  cy.get('[data-cy="cancel"]').click()
  cy.get('[data-cy="board-options"]').click()
  cy.intercept('DELETE', '/api/boards/**').as('deleteBoardRequest')
  cy.get('[data-cy="delete-board"]').click()
  cy.get('@deleteBoardRequest')
});
