import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import SimpleBlog from '../components/SimpleBlog'

describe('<SimpleBlog />', () => {
  let blog
  beforeEach(() => {
    blog = {
      title: 'test blog',
      author: 'test author',
      likes: 3
    }
  })

  afterEach(cleanup)

  test('renders author, title and likes', () => {
    const component = render(<SimpleBlog blog={blog} onClick={() => {}} />)
    const header = component.container.querySelector('.blog-header')
    console.log(prettyDOM(component.container))
    expect(header).toHaveTextContent(`${blog.title} ${blog.author}`)
    const likes = component.container.querySelector('.blog-content')
    expect(likes).toHaveTextContent(blog.likes)
  })

  test('like button event handler is fired when clicked', () => {
    const mockHandler = jest.fn()
    const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const likeButton = component.getByText('like')
    console.log(prettyDOM(likeButton))
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})