
describe('login functionality', () => {
    beforeEach('register',()=>{
        cy.visit('https://flamboyant-allen-00cf47.netlify.app/signUp')

    })
    

    it('Verify create new button',()=>{
        cy.visit('https://flamboyant-allen-00cf47.netlify.app/login')
        cy.get('.form-footer > a').click();
        cy.url().should('be.equal','https://flamboyant-allen-00cf47.netlify.app/signUp')

    })

    it('Verify registration with null data',()=>{
     cy.get('.btn').click();
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('have.text',' Name is Required ')
        cy.get(':nth-child(2) > .error-messages > .invalid-text').should('have.text',' Gender is Required ')
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('have.text',' Date of Birth is Required ')
        cy.get(':nth-child(2) > .invalid-text').should('have.text',' Phone Number is Required ')
        cy.get(':nth-child(5) > .error-messages > :nth-child(1)').should('have.text',' Email is Required ')
        cy.get('.error-messages > :nth-child(2)').should('have.text',' Please Enter Valid Email ')
    })

    it('Verify if white spaces are read as character in Name filed and phone number field',()=>{
        cy.get('#name').type('     ')
        cy.get('#phone').type('            ')
        cy.get('.btn').click();
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('have.text',' Name is Required ')
        cy.get(':nth-child(2) > .invalid-text').should('have.text',' Phone Number is Required ')
    })

  it('Verify if number can be passed in name field',()=>{
      cy.get('#name').type('12344')
      cy.get(':nth-child(1) > .error-messages > .invalid-text').should('have.text',' Name can only contain letters ') 
  })

  it('Verify if special characters can be passed in name field',()=>{
    cy.get('#name').type('****+')
    cy.get(':nth-child(1) > .error-messages > .invalid-text').should('have.text',' Name can only contain letters ') 
})

it('Verify if the DOB greater than present date can be choosen',()=>{
    cy.get('.mat-form-field-infix').type('2025/01/01{enter}')
    cy.get(':nth-child(3) > .error-messages > .invalid-text').should('have.text',' Please enter the valid DOB')

})

it('Verify if the country code can be choosn',()=>{
    cy.get('.iti__selected-flag').click()
    cy.get('#country-search-box').type('Nepal')
    cy.get('#iti-0__item-np > .iti__country-name').click()
    cy.get('#phone').invoke('attr', 'placeholder').should('contain', '+977 1-4567890')
})

it('Verify if alphabets or special character except + and - can be passed in phone number field',()=>{
    cy.get('#phone').type('aba')
    cy.get('#phone').type('*****///')
    cy.get('#phone').should('be.empty')
    cy.get('#phone').should('not.have.value')

})
it('Verify if less than 10 numbers can be passed in mobile number',()=>{
    cy.get('#phone').type('46464')
    cy.get('.btn').click();
    cy.get(':nth-child(4) > :nth-child(3) > .invalid-text').should('have.text',' Please Enter Valid Phone ')


})

it('Verify if invalid email format can be inputted',()=>{
    cy.get('#email').type('abc')
    cy.get(':nth-child(5) > .error-messages > .invalid-text').should('have.text',' Please Enter Valid Email ')
})

it('Verify if the user can click "Next" Button with all the valid datas',()=>{
    cy.get('#name').type('Bruno')
    cy.get('[type="radio"]').check('Male',{force:true})
     cy.get('#mat-input-0').type('2000/01/01')
     cy.get('.iti__selected-flag').click()
     cy.get('#country-search-box').type('Nepal')
     cy.get('#iti-0__item-np > .iti__country-name').type('9876543211')
    cy.get('#email').type('bruno@gmail.com')
    cy.get('.btn').click();
     cy.url().should('be.equal','https://flamboyant-allen-00cf47.netlify.app/signUp/setPassword')

})

it('Verify if user can input wrong format of password',()=>{
    cy.visit('https://flamboyant-allen-00cf47.netlify.app/signUp/setPassword')
    cy.get(':nth-child(1) > #password').type('1')
    cy.get('.text-sucess > span > .ng-fa-icon > .svg-inline--fa > path').should('be.visible')
    cy.get('.error-messages > :nth-child(1)').should('have.text',' Must Be atleast 8 characters! ')
    cy.get('.error-messages > :nth-child(3)').should('have.text',' Must contain atleast one uppercase character! ')
    cy.get('.error-messages > :nth-child(4)').should('have.text',' Must contain atleast one lowercase character! ')
    cy.get('.error-messages > :nth-child(5)').should('have.text',' Must contain atleast one special character! ')
})

it('Verify if "New Password" and "Confirm Password" can be different',()=>{
    cy.visit('https://flamboyant-allen-00cf47.netlify.app/signUp/setPassword')
    cy.get(':nth-child(1) > #password').type('Brunotest01@')
    cy.get(':nth-child(2) > #password').type('Bruniitest01@')
    cy.get(':nth-child(2) > .error-messages > .invalid-text').should('have.text',' Password Must Match ')
    

})

it('Verify if user can click "Sign Up " button  with same new and confirm password',()=>{
    cy.get('#name').type('Bruno')
    cy.get('[type="radio"]').check('Male',{force:true})
     cy.get('#mat-input-0').type('2000/01/01')
     cy.get('.iti__selected-flag').click()
     cy.get('#country-search-box').type('Nepal')
     cy.get('#iti-0__item-np > .iti__country-name').type('9876543211')
    cy.get('#email').type('bruno@gmail.com')
    cy.get('.btn').click();
    cy.get(':nth-child(1) > #password').type('Brunotest01@')
    cy.get(':nth-child(2) > #password').type('Brunotest01@')
    cy.get('.btn').click();
    
})

it('Verify if click on "TODO APP" text takes to the home page',()=>{
   
    cy.get('h1').click();
    cy.url().should('be.equal','https://flamboyant-allen-00cf47.netlify.app/home')

})



})
