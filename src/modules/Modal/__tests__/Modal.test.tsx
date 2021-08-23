import { render, screen } from '@testing-library/react'
import Modal from '..'
import React from 'react'
import '@testing-library/jest-dom' // Allows the use of additional matchers for testing components.

// Mocking methods which are not implemented in JSDOM
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    addEventListener: jest.fn(),
    addListener: jest.fn(), // Deprecated
    dispatchEvent: jest.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(), // Deprecated
  })),
  writable: true,
})

describe('Modal Component', () => {
  it('Should show/hide modal and render child component', () => {
    const title = 'This is a modal'
    const hideModal = (): void => {
      // method invoked when user clicks outside of the modal
    }

    // Modal is hidden
    const { container, rerender } = render(
      <Modal isVisible={false} hideModal={hideModal}>
        <h1>{title}</h1>
      </Modal>,
    )

    expect(container.querySelector('#modal')).toHaveClass('modal-display-none')
    expect(screen.getByText(title)).toHaveTextContent(title)

    // Modal is visible
    rerender(
      <Modal isVisible={true} hideModal={hideModal}>
        <h1>{title}</h1>
      </Modal>,
    )
    expect(container.querySelector('#modal')).not.toHaveClass()
  })
})
