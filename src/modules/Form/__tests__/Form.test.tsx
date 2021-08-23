import { IQuote, IQuoteSaveResponse } from '../../../common/interfaces'
import { fireEvent, render, screen } from '@testing-library/react'
import Form from '..'
import React from 'react'
import '@testing-library/jest-dom' // Allows the use of additional matchers for testing components.

const quoteData: IQuoteSaveResponse = {
  _id: '12345',
  author: 'Deejay Geroso',
  createdAt: 'createdAt',
  quote: 'Deejay is the way',
  updatedAt: 'updatedAt',
}

const setup = () => {
  // This allows us to check if data was saved after clicking save button
  const onCreate = (quoteResult: IQuote): void => {
    expect(quoteResult.author).toBe(quoteData.author)
    expect(quoteResult.quote).toBe(quoteData.quote)
  }

  const propMethods = (): void => {
    // Form methods
  }

  const utils = render(<Form onCancel={propMethods} onCreate={onCreate} onUpdate={propMethods} />)
  const authorInput = utils.getByLabelText('Author Name*')
  const quoteInput = utils.getByLabelText('Quote*')
  return {
    authorInput,
    quoteInput,
    ...utils,
  }
}

describe('Form Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => {
          return Promise.resolve(quoteData)
        },
      }),
    ) as jest.Mock
  })

  it(`Should show error on UI if input's are empty. Button should be disabled.`, () => {
    const { authorInput, quoteInput } = setup()
    expect(authorInput).toHaveValue('')
    expect(quoteInput).toHaveValue('')

    // Type on input
    fireEvent.change(authorInput, { target: { value: quoteData.author } })
    fireEvent.change(quoteInput, { target: { value: quoteData.quote } })

    // Remove typed text
    fireEvent.change(authorInput, { target: { value: '' } })
    fireEvent.change(quoteInput, { target: { value: '' } })

    // Input should now be in error state
    expect(authorInput).toHaveClass('input-error')
    expect(quoteInput).toHaveClass('input-error')
    expect(screen.getByText('Save')).toBeDisabled()
  })

  it('Button should be enabled if all inputs are filled', async () => {
    const { authorInput, quoteInput } = setup()
    // Type on input
    fireEvent.change(authorInput, { target: { value: quoteData.author } })
    fireEvent.change(quoteInput, { target: { value: quoteData.quote } })

    expect(screen.getByText('Save')).not.toBeDisabled()
  })

  it('Should save author and quote when save button is pressed', async () => {
    const { authorInput, quoteInput } = setup()
    // Type on input
    fireEvent.change(authorInput, { target: { value: quoteData.author } })
    fireEvent.change(quoteInput, { target: { value: quoteData.quote } })

    // Click Save Button
    const saveButton = screen.getByText('Save')
    await fireEvent.click(saveButton)
  })
})
