import { IQuote, IQuoteSaveResponse } from '../../common/interfaces'
import React, { ReactElement, useEffect, useState } from 'react'
import createQuote from '../../api/createQuote'
import updateQuote from '../../api/updateQuote'
import './index.scss'

interface IProps {
  data?: IQuote
  onCancel: () => void
  onCreate: (quote: IQuote) => void
  onUpdate: (quote: IQuote) => void
}

const Form = (props: IProps): ReactElement => {
  const { data = null, onCancel, onCreate, onUpdate } = props
  const [author, setAuthor] = useState('')
  const [quote, setQuote] = useState('')

  const [isAuthorError, setAuthorError] = useState(false)
  const [isQuoteError, setQuoteError] = useState(false)

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const authorValue = event.target.value
    setAuthor(authorValue)

    if (authorValue === '') {
      setAuthorError(true)
    } else {
      setAuthorError(false)
    }
  }

  const handleQuoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const quoteValue = event.target.value
    setQuote(quoteValue)

    if (quoteValue === '') {
      setQuoteError(true)
    } else {
      setQuoteError(false)
    }
  }

  const clearForm = (): void => {
    setAuthor('')
    setQuote('')
    setAuthorError(false)
    setQuoteError(false)
  }

  const updateQuoteFromDB = async (quoteId: string): Promise<void> => {
    const result: IQuoteSaveResponse = await updateQuote(quoteId, author, quote)
    if (!result.error) {
      onUpdate(result)
    }
  }

  const createNewQuoteThenSaveToDB = async (): Promise<void> => {
    const result: IQuoteSaveResponse = await createQuote(author, quote)
    if (!result.error) {
      onCreate(result)
    }
  }

  const handleSave = async (): Promise<void> => {
    if (author && quote) {
      if (data) {
        updateQuoteFromDB(data._id)
      } else {
        createNewQuoteThenSaveToDB()
      }
      clearForm()
    }
  }

  useEffect((): void => {
    if (data) {
      setAuthor(data.author)
      setQuote(data.quote)
    } else {
      clearForm()
    }
  }, [data])

  const isSaveButtonDisabled = !author || !quote

  return (
    <div className='modal-form'>
      <h1>{data ? 'Update' : 'Add'} Quote</h1>
      <div className='input-wrapper'>
        <label htmlFor='author-input'>
          Author Name* {isAuthorError && <span className='error-message'>Author must not be empty</span>}
        </label>
        <input
          className={isAuthorError ? 'input-error' : ''}
          id='author-input'
          name='author'
          placeholder='Author Name'
          type='text'
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='quote-input'>
          Quote* {isQuoteError && <span className='error-message'>Quote must not be empty</span>}
        </label>
        <textarea
          className={isQuoteError ? 'input-error' : ''}
          cols={80}
          id='quote-input'
          name='quote'
          rows={12}
          onChange={handleQuoteChange}
          placeholder={`Write the author's quote here...`}
          value={quote}
        />
      </div>
      <div>
        <button className='cancel-button' onClick={onCancel}>
          Cancel
        </button>
        <button className='save-button' onClick={handleSave} disabled={isSaveButtonDisabled}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Form
