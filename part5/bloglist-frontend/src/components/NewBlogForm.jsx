import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createNewBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = ({ target }) => { setNewTitle(target.value) }
  const handleAuthorChange = ({ target }) => { setNewAuthor(target.value) }
  const handleUrlChange = ({ target }) => { setNewUrl(target.value) }

  const addBlog = (event) => {
    event.preventDefault()
    createNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input id='title-input' type='text' value={newTitle} onChange={handleTitleChange} name='Title' />
      </div>
      <div>
        author: <input id='author-input' type='text' value={newAuthor} onChange={handleAuthorChange} name='Author' />
      </div>
      <div>
        url: <input id='url-input' type='text' value={newUrl} onChange={handleUrlChange} name='Url' />
      </div>
      <button id='create' type='submit'>create</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm