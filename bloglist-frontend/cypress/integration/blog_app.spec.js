describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // const user = {
    //   name: '11111',
    //   username: '11111',
    //   password: '11111'
    // }
    // cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
    cy.login({ username: '11111', password: '11111' })
    cy.waitForReact()
  })

  // it('Login form is shown', function() {
  //   cy.get('input:first')
  //   cy.get('input:last')
  // })

  // it('succeeds with correct credentials', function() {
  //     cy.contains('Login').click()
  //     cy.get('input:first').type('11111')
  //     cy.get('input:last').type('11111')
  // })

  // it('fails with wrong credentials', function() {
  //     cy.contains('Login').click()
  //     cy.get('input:first').type('mluukkai')
  //     cy.get('input:last').type('wrong')      
  //     cy.contains('Wrong credentials')
  //   })
  // })
  
  it('a new note can be created', function() {
     cy.contains('New Blog').click()
     cy.get('#title').type('a note created by cypress')
     cy.get('#author').type('a note created by cypress')
     cy.get('#url').type('a note created by cypress')
     cy.contains('Create').click()
     cy.contains('a note created by cypress')
   })

  it('check like', function() {
     cy.contains('Like').click()
     cy.contains('view').click()
     cy.contains('3')
   })

   it("check delete", function() {
     cy.contains("view").click()
     cy.contains("remove").click()
     cy.contains("remove successfully")
   })

   it("check unauthorized can't delete", function() {
     cy.contains("view").click()
     cy.contains("remove").should("not.exist")
   })

   it.only("check order", function() {
     cy.contains("view").click()
     cy.contains("view").click()
     cy.contains("view").click()
     cy.contains("view").click()
     cy.get("span.test").then(($blog) => {
       expect($blog).to.have.length(4)
       console.log($blog)

       for (let i = 0; i < $blog.length; i++) {
         if (i < $blog.length - 1) {
           expect(
             Number($blog[i].innerText)
           ).to.be.least(
             Number($blog[i + 1].innerText)
           )
         } else {
           expect(
            Number($blog[i].innerText)
           ).to.be.most(Number($blog[i -1].innerText))
         }
       }
     })
   })
})
