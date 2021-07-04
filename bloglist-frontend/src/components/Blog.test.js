import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "true",
    url: "123",
    likes: 5,
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateLike={mockHandler} />
  )

  const button = component.getByText("Like")
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)



  // const button = component.getByText("view")
  // fireEvent.click(button)

  // expect(component.container).toHaveTextContent(
  //   'Component testing is done with react-testing-library'
  // )

  // expect(component.container).toHaveTextContent(
  //   'true',
  //   "123",
  //   5
  // )
})
