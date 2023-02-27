describe('Blog app', function() {
  
  const user = {
    name:'Lionel Messi',
    username:'lmessi',
    password:'lmessi'
  }

  const anotherUser = {
    name:'Francisco Eureka',
    username:'feureka',
    password:'feureka'
  }

  const newBlog = {
    title:'Lio Messi Blog',
    author:'4aLifeTime',
    url:'http://lmessiblog.com'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')

  })
  
  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.get('#username')
    cy.contains('password')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: user.username, password: user.password })
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong username')
      cy.get('#password').type('wrong password')
      cy.get('#login').click()
      cy.get('.error').should('contain','wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function() {
      cy.createBlog(newBlog)
    })

    describe('and a blog exists', function() {

      beforeEach(function() {
        cy.createBlog(newBlog)
        cy.request('POST', 'http://localhost:3003/api/users', anotherUser)
      })

      it('it can be liked', function() {
        cy.contains('show').click()
        cy.get('.likes').should('contain','0')
        cy.contains('like').click()
        cy.get('.likes').should('contain','1')
      })

      it("can't be deleted by other user", function() {
        cy.get('#logout').click()
        cy.login({ username: anotherUser.username, password: anotherUser.password })
        cy.contains('show').click()
        cy.get('#remove').click()
        cy.get('.error').should('contain','Something went wrong removing the blog!')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      })

      it('can be deleted by the owner', function() {
        cy.contains('show').click()
        cy.get('#remove').click()
      })

    })

    describe('When many blogs are created', function (){
      beforeEach(function() {
        cy.createBlog({
          title:'first blog',
          author:'first',
          url:'http://first.com',
          likes:3
        })
        cy.createBlog({
          title:'second blog',
          author:'second',
          url:'http://second.com',
          likes:2
        })
        cy.createBlog({
          title:'third blog',
          author:'third',
          url:'http://third.com',
          likes:1
        })
      })


      it('blogs are ordered by number of likes', function() {
       cy.get('.blog').eq(0).should('contain', 'first blog')
       cy.get('.blog').eq(1).should('contain', 'second blog')
       cy.get('.blog').eq(2).should('contain', 'third blog')
      
       cy.get('.blog').eq(2).contains('show').click()

       cy.get('.blog').eq(2).contains('like').click()
       cy.wait(100)
       cy.get('.blog').eq(2).contains('like').click()

       cy.get('.blog').eq(1).should('contain', 'third blog')


      })

    })

  })



})  