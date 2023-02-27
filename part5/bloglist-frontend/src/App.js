import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }

  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setNotification({ message: `a new blog ${newBlog.title} by ${newBlog.author} added!`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      setBlogs(blogs.concat(newBlog))

    } catch (exception) {
      setNotification({ message: 'Something went wrong adding a new blog!', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleUpdateLikes = async (blogObject) => {
    try {
      const blogToUpdate = { likes: blogObject.likes++, ...blogObject }
      const updatedBlog = await blogService.update(blogToUpdate)
      setBlogs(
        blogs
          .map(blog => blog.id !== blogToUpdate.id ? blog : updatedBlog)
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
      )
      setNotification({ message: 'Blog updated succesfully!', type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)

    } catch (error) {
      setNotification({ message: 'Something went wrong updating the blog!', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleRemoveBlog = async (blogToRemove) => {

    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      try {
        await blogService.remove(blogToRemove.id)
        setBlogs(
          blogs
            .filter(blog => blog.id !== blogToRemove.id)
        )
        setNotification({ message: 'Blog removed succesfully!', type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 3000)

      } catch (error) {
        setNotification({ message: 'Something went wrong removing the blog!', type: 'error' })
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      }
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in<button id='logout' type='button' onClick={handleLogOut}>logout</button></p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <h3>create new</h3>
        <NewBlogForm
          createNewBlog={handleNewBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={handleUpdateLikes}
          removeBlog={handleRemoveBlog}
        />
      )}
    </div>
  )
}

export default App
