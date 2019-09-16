import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import Blog from '../components/Blog'

describe('<Blog />' , () => {
  let blog
  let user
  beforeEach(() => {
    blog = {
      title: 'test blog',
      author: 'test author',
      likes: 3,
      url: 'test url',
      user: {
        id: 'adf787dfdfa0adf0'
      }
    }
  })

  test('only author and title are visible by default', () => {
    const component = render(<Blog blog={blog} />)
    const header = component.container.querySelector('.blog-card--title')
    expect(header).toHaveTextContent(`${blog.title} ${blog.author}`)
    const body = component.container.querySelector('.blog-card')
    expect(body).toBeNull()
  })

  test('only author and title are visible by default', () => {
    const component = render(<Blog blog={blog} />)
    const header = component.container.querySelector('.blog-card--title')
    fireEvent.click(header)
    console.log(prettyDOM(component.container))
    const body = component.container.querySelector('.blog-card')
    expect(body).toBeDefined()
  })
})