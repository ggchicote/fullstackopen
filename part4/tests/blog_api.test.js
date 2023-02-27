const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const newBlog = {
  title: 'BlogON',
  author: 'Jennyfer Sthan',
  url: 'https://blogon.to',
  likes:20
}

const mockUser = {
  username:"someusername",
  password:"somepassword"
}

let token = null

beforeEach(async () => {

  await Blog.deleteMany({})
  await User.deleteMany({})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(mockUser.password, saltRounds)
  const newUser = await new User({username:mockUser.username,passwordHash:passwordHash})
  newUser.save()

  const userForToken = {
    username: newUser.username,
    id: newUser._id,
  }
  token = jwt.sign(userForToken, process.env.SECRET)

  const blogObjects = helper.initialBlogs.map(blog => new Blog({user: newUser._id, ...blog}))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

},100000)

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
    
  }, 100000)
})

describe ('adition of a new blog', () => {
  test('succeeds with valid data', async () => {

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)   
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

    const titles = response.body.map(blog => blog.title)
    expect(response.body).toHaveLength(helper.initialBlogs.length+1)
    expect(titles).toContain(newBlog.title)
  }, 100000)

  test('the unique identifier property is named id', async () => {
  
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body.id).toBeDefined()
  
  }, 100000)

  test('fails with status code 400 if title or url properties are missing', async () => {
  
    const {title, ...newBlogWithOutTitle} =  newBlog
    const {url, ...newBlogWithOutUrl} =  newBlog
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)   
      .send(newBlogWithOutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)   
      .send(newBlogWithOutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)  
  }, 100000)

  test('fails with status code 401 if if a token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

  }, 100000)

  test('will default to the value 0 if likes property is missing', async () => {
  
    const {likes, ...newBlogWithOutLikes} =  newBlog
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogWithOutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body.likes).toBe(0)
  
  }, 100000)

})

describe('deletion of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  }, 100000)
})

describe('updating of a blog', () => {
  test('succeeds with status code 201 only updating a blog likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = {likes:20, ...blogsAtStart[0]}

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(blogToUpdate)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd[0].likes).toBe(20)
  }, 100000)

})


afterAll(() => {
  mongoose.connection.close()
})