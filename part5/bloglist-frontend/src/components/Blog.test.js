/* eslint-disable quotes */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  const newBlog = {
    title:'This is a blog about testing',
    url:'http://ablogabouttesting.com',
    author:'John Tests',
    likes:999,
    user: {
      id: '10000',
    },
  }

  test("renders only blog's title by default", () => {

    const { container } = render(<Blog blog={newBlog} />)

    const title = container.querySelector('#blog-title')
    const blogDetail = container.querySelector('.blogDetail')
    const url = screen.getByText(newBlog.url)
    const author = screen.getByText(newBlog.author)
    const likes = screen.getByText(newBlog.likes)

    expect(title).toHaveTextContent(newBlog.title)
    expect(blogDetail).toHaveStyle('display: none')
    expect(url).not.toBeVisible()
    expect(author).not.toBeVisible()
    expect(likes).not.toBeVisible()

  })

  test("blog's details - author, likes and url - are shown after clicking shown details button", async () => {

    render(<Blog blog={newBlog} />)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const url = screen.getByText(newBlog.url)
    const author = screen.getByText(newBlog.author)
    const likes = screen.getByText(newBlog.likes)

    expect(url).toBeVisible()
    expect(author).toBeVisible()
    expect(likes).toBeVisible()

  })

  test('if like button is clicked twice the event handler component is called twice', async () => {

    const mockHandler = jest.fn()
    render(<Blog blog={newBlog} updateLikes={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})