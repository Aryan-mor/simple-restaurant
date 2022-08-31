import ROUTS from "../../../src/common/ROUTS";

describe('example to-do app', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:3000/')
    })

    it('add to basket and buy and check invoice', () => {
        const addBtnEl = cy.get(".plate:first-child .add-btn").first();
        addBtnEl.click();

        cy.get('.plate:first-child [data-cy="decrease-count"]').first().should('be.visible')
        cy.get('.plate:first-child [data-cy="increase-count"]').first().should('be.visible')
        cy.get('.plate:first-child [data-cy="increase-count"]').first().click({force: true})
        cy.get('.plate:first-child [data-cy="count"]').first().should("have.text", "2")
        cy.get('.plate:first-child [data-cy="decrease-count"]').first().click()
        cy.get('.plate:first-child [data-cy="count"]').first().should("have.text", "1")
        cy.get('.plate:first-child [data-cy="increase-count"]').first().click({force: true})

        const btnEl = cy.get(".payment-btn")
        btnEl.should('be.visible')
        btnEl.get(".payment-btn").click()
        cy.contains("Payment Successful")
        cy.get('[data-cy="successfully-close-btn"]').click()
        cy.contains("Your Basket Is Empty")
        cy.get('header ul a[data-cy="invoices"]').click()
        cy.visit("http://localhost:3000" + ROUTS.Invoices.createLink())
        cy.get("table tbody tr:first-child button").click()
        cy.get('[data-cy="invoice-summery"]').contains("Discount Price")
        cy.get('[data-cy="invoice-summery"]').contains("Delivery Price")
        cy.get('[data-cy="invoice-summery"]').contains("Total Plate Price")
        cy.get('[data-cy="invoice-summery"]').contains("Total Price")
        cy.get('[data-cy="invoice-summery"]').contains("Payed")
    })
})
