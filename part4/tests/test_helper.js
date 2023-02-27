const Blog = require('../models/Blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Medium',
    author: 'Lionel Messi',
    url: 'https://medium.com',
  },
  {
    title: 'Dev',
    author: 'Lionel Scaloni',
    url: 'https://dev.to',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'titlewillremovesoon', author: 'authorwillremovesoon', url:'urlwillremovesoon'})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}