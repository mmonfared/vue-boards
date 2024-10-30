/// <reference types="Cypress" />

describe('it passes', () => {
    beforeEach(() => {
        cy.resetApi()
    })

    //Start writing your tests here:
    it('Create user and verify the response gets 201 status', () => {
        cy.addNewUser().then((response) => {
            expect(response.status).to.eq(201)
        })
    });

    it('Create a new board, a list for that board, and a card for that list using API', () => {
        let boardName = `board${Cypress._.random(0, 1e5)}`
        let listName = `list${Cypress._.random(0, 1e5)}`
        let cardName = `card${Cypress._.random(0, 1e5)}`
        cy.createNewBoard(boardName).then((boardResponse) => {
            expect(boardResponse.status).to.eq(201)
            cy.createNewList(listName, boardResponse.body.id).then((listResponse) => {
                expect(listResponse.status).to.eq(201)
                cy.createNewCard(cardName, boardResponse.body.id, listResponse.body.id).then((cardResposne) => {
                    expect(cardResposne.status).to.eq(201)
                })
            })
        })
    })

})