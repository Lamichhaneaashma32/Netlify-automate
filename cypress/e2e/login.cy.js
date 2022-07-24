




describe('login functionality', () => {
  beforeEach('', () => {
    cy.visit('https://flamboyant-allen-00cf47.netlify.app/login')
  })

  it(" login button should not be clickable with null data", () => {
    cy.get("app-button").click();
    cy.wait(1000)
    cy.get('.btn').should('be.disabled')
  });

  it('invalid email and password',()=>{
    cy.get('#email').type('abc@gmail.com')
    cy.get('#password').type('Aashmatest0@')
    cy.get('app-button').click();
   cy.get('.ng-submitted > :nth-child(1) > :nth-child(6)').should('have.text',' Incorrect Email Address ! ')
   cy.get(':nth-child(2) > :nth-child(7)').should('have.text',' Incorrect Password ! ')

  })

  it('wrong format of email',()=>{
    cy.get('#email').type('abc')
   cy.get(':nth-child(1) > .invalid-text').should('have.text',' Invalid Input ')
   
  })

  it('wrong format of password',()=>{
    cy.get('#password').type('123d')
   cy.get(':nth-child(2) > .invalid-text').should('have.text',' Invalid Input ')
   
  })

  var passmask= "Aashmatest0@";
  it('password masked and unmasked',()=>{
    cy.get('#email').type('abc@gmail.com')
    cy.get('#password').type(passmask)
    cy.get(':nth-child(2) > .right-icon > .svg-inline--fa').click();
    cy.get('#password').should('have.value', passmask)
     
  })

  it('valid email and password',()=>{
    cy.get('#email').type('bruno@gmail.com')
    cy.get('#password').type('Brunotest01@')
    cy.get('app-button').click();
    cy.wait(1000)
    cy.url().should('be.equal','https://flamboyant-allen-00cf47.netlify.app/dashboard')
  
  })
  it(' login with clicking enter key on keyboard withvalid email and password',()=>{
    cy.get('#email').type('bruno@gmail.com')
    cy.get('#password').type('Brunotest01@{enter}')
    cy.wait(1000)
    cy.url().should('be.equal','https://flamboyant-allen-00cf47.netlify.app/dashboard')
  
  })

  it(' verify forgot password button',()=>{
    cy.get('.forgot-password').click()
    cy.url().should('be.equal','https://flamboyant-allen-00cf47.netlify.app/forgotPassword')
  
  })

  it(' verify invalid email for forgot password',()=>{
    cy.visit('https://flamboyant-allen-00cf47.netlify.app/forgotPassword')
    cy.get('#email').type('abc@gmail.com')
    cy.get('.btn').click()
   cy.get('.message').should('have.text','Email doesnot exist')
  
  })
  it(' verify valid email for forgot password',()=>{
    cy.visit('https://flamboyant-allen-00cf47.netlify.app/forgotPassword')
    cy.get('#email').type('bruno@gmail.com')
    cy.get('.btn').click()
  
  
  })




})