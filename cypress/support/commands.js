/// <reference types="cypress" />
import { generateRandomIdentity } from "../support/utils"
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Use with Caution...
Cypress.Commands.add('resetApi', () => {
    Cypress.log({ displayName: 'Reset Database' })
    cy.request('POST', '/api/reset');
});

Cypress.Commands.add('resetBoards', () => {
    Cypress.log({ displayName: 'Reset boards, lists and cards' })
    cy.request('POST', '/api/boards');
});

Cypress.Commands.add('addNewUser', (email='', password='') => {
    if (!email || !password) {
        let identity = generateRandomIdentity()
        email = identity.email
        password = identity.password
    } 
    
    Cypress.log({displayName: `Signing up new user: ${email}`})
        cy.request('POST', '/api/signup',
            {
                "email": email,
                "password": password
              }
        ).then((response) => {
            return response
        })
})

Cypress.Commands.add('createNewBoard', (boardName) => {
    Cypress.log({displayName: `Creating new board: ${boardName}`})
        cy.request('POST', '/api/boards', {
            "name": boardName
          }).then((response) => {
            return response
        })
})

Cypress.Commands.add('createNewList', (listName, boardId) => {
    let identity = generateRandomIdentity()
    Cypress.log({displayName: `Creating list ${listName} on board ID: ${boardId}`})
        cy.request('POST', '/api/lists',
            {
                "boardId": {boardId}, 
                "name": listName
              }
        ).then((response) => {
            return response
        })
})

Cypress.Commands.add('createNewCard', (cardName, boardId, listId) => {
    let identity = generateRandomIdentity()
    Cypress.log({displayName: `Creating card ${cardName} on list ID: ${listId} related to the board ID ${boardId}`})
        cy.request('POST', '/api/cards',
            {
                "boardId": {boardId}, 
                "listId": {listId}, 
                "name": cardName
              }
        ).then((response) => {
            return response
        })
})
