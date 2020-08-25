'use strict'

const { isType } = require("graphql")

describe('Tweets searcher tests', () => {
    beforeEach( () => {
        cy.visit('/home')
    })
    it('Should shows home page', () => {
        cy.contains('.subject-text', 'Tweets Searcher').should('be.visible')
    })

    it('Should shows redisData page', () => {
        cy.get('.redis-text').click()
        cy.contains('.subject-text','Tweets Storaged on Redis').should('be.visible')
    })

    it('Should shows tweets based on the keyword', () => {
        cy.get('#keyword').type('platzi')
        cy.get('.submit-button').click()
        cy.wait(1500)
        cy.get('.tweet-details').should('be.visible')
    })

    it('Should shows the first 50 tweets based on the keyword', () => {
        cy.get('#keyword').type('platzi')
        cy.get('.submit-button').click()
        cy.wait(1500)
        cy.get(':nth-child(50)').should('be.visible')
    })
    
})