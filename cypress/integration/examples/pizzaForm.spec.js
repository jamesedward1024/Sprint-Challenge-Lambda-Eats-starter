describe('Pizza Builder Form', () => {
    it('Can navigate to the site', () => {
        cy.visit('http://localhost:3000/pizza')
        cy.url().should('include', 'localhost')
    })
    it('Can type in name input',()=>{
        cy.get('[name=Name]').type('James')
    })
    it('Can select pizza size',()=>{
        cy.get('[name=Size]').select('large')
    })
    it('Can select pizza crust',()=>{
        cy.get('[name=Crust]').select('deep')
    })
    it('Can select pepperoni',()=>{
        cy.get('[name=pepperoni]').click()
    })
    it('Can select sausage',()=>{
        cy.get('[name=sausage]').click()
    })
    it('Can select pineapple',()=>{
        cy.get('[name=pineapple]').click()
    })
    it('Can select bacon',()=>{
        cy.get('[name=bacon]').click()
    })
    it('Can submit order form',()=>{
        cy.contains('Submit').click()
    })
})