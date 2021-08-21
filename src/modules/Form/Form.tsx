import { IQuote, IQuoteSaveResponse } from '../../common/interfaces'
import React, { ReactElement, useState } from 'react'
import createQuote from '../../api/createQuote'

interface IProps {
  onCancel: () => void
  onSave: (quote: IQuote, isAnUpdateEvent: boolean) => void
}

const Form = (props: IProps): ReactElement => {
  const { onCancel, onSave } = props
  const [author, setAuthor] = useState('')
  const [quote, setQuote] = useState('')

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value)
  }

  const handleQuoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuote(event.target.value)
  }

  const clearForm = (): void => {
    setAuthor('')
    setQuote('')
  }

  const handleSave = async (): Promise<void> => {
    if (author && quote) {
      const result: IQuoteSaveResponse = await createQuote(author, quote)
      if (!result.error) {
        onSave(result, false)
      }
      clearForm()
    }
  }

  return (
    <div className='modal-form'>
      <h1>Add Quote</h1>
      <div>
        <input
          type='text'
          id='author-input'
          name='author'
          placeholder=''
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <textarea id='quite-input' name='quote' rows={4} cols={50} value={quote} onChange={handleQuoteChange} />
      </div>
      <div>
        <button className='cancel-button' onClick={onCancel}>
          Cancel
        </button>
        <button className='save-button' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Form
