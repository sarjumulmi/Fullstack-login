import React from 'react'
import { render, waitForElement } from '@testing-library/react'

jest.mock('../services/blogs')
import App from '../App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Login')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
    const formHeader = component.container.querySelector('h2')
    expect(formHeader).toHaveTextContent('Login to the application')
  })

  test('render blogs after user is logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester',
      id: '5d79408def742e1c2ef86190'
    }
    localStorage.setItem('user', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('Blogs')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3) 
  })
})