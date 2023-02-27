/* eslint-disable quotes */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {

  const newBlog = {
    title:'This is a blog about testing',
    url:'http://ablogabouttesting.com',
    author:'John Tests',
    likes:999,
    user: {
      id: '10000',
    },
  }

  test('form event handler receives props with the right details when a new blog is created', async () => {

    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<NewBlogForm createNewBlog={createBlog} />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')

    const submitButton = screen.getByText('create')

    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)

    await user.click(submitButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
    expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
    expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)

  })

})