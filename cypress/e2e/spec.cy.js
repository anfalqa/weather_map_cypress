const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})
/// <reference types="cypress"/> 


describe('open weather map E2E test ', () => {

  it.only('Search Suggestion and Verify Weather', () => {
    let city = "Landon";
    cy.visit('/');

    cy.get('[placeholder="Search city"]').type(city);
    cy.get('[placeholder="Search city"]').type('{enter}')
    cy.get('.search-dropdown-menu > li').click();

    cy.wait(5000);

    cy.get('h2').eq(1).should('have.text', 'Landon, US');
    cy.get('.current-temp').should('be.visible');

  });

  it('Select City from Map', () => {
    cy.visit('/');
    cy.get('.map-info-block').invoke('removeAttr', 'target', '_self').click();
    cy.get('.row.city-main-info').contains("Amman").click();
    cy.get('table').should('be.visible');
  
  });

  it('Map 2 ', () => {
    cy.viewport('macbook-15');
    cy.visit('/');
    cy.get('#desktop-menu > ul:nth-child(2) > li:nth-child(6) > a:nth-child(1)').click({ force: true });
    cy.wait(2000);
    cy.get('.row.city-main-info').contains("Amman").click();
    cy.get('body').should('be.visible');
    cy.get('table').should('be.visible');

  });

  it('Switch Temperature Units', () => {
    cy.visit('/');
    cy.wait(2000)
    cy.get('.switch-container > :nth-child(3)').click();
    cy.get('.heading').should('include.text', 'F');;
  });

  it('Explore Additional Features', () => {
    cy.viewport('macbook-15');
    cy.visit('/');
    cy.wait(200);
    cy.get('#desktop-menu > :nth-child(2) > :nth-child(9)').invoke('removeAttr', 'target', '_self').click({ force: true });
    cy.get('body').should('be.visible');
  });

  ['macbook-15', 'ipad-mini', 'iphone-x'].forEach(viewPort => {
    it('Responsive Design Test', () => {
      cy.visit('/');
    });
  });









})//describe