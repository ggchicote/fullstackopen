const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ 
      error: 'title or url are missing' 
    })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  const blog = new Blog({
    title:body.title,
    author:body.author || '',
    url:body.url,
    likes:body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id',  middleware.userExtractor, async (request, response) => {
  
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(401).json({ error: "blog id doesn't exists" })

  const user = request.user
  if ( blog.user.toString() !== user.id.toString() ) {
    return response.status(401).json({ error: 'user not authorized to delete this blog' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(200).json({
    message: 'blog deleted successfully!'
  })
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
 
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(401).json({ error: "blog id doesn't exists" })
 
  const user = request.user
  if ( blog.user.toString() !== user.id.toString() ) {
    return response.status(401).json({ error: 'user not authorized to update this blog' })
  }

  const body = request.body
 
  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  }

  const filter = { _id: request.params.id }
  const updatedBlog = await Blog.findByIdAndUpdate(filter, blogToUpdate, { new: true, runValidators: true })
  response.status(201).json(updatedBlog)

})

module.exports = blogsRouter