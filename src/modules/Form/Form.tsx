import { IQuote, IQuoteSaveResponse } from '../../common/interfaces'
import React, { ReactElement, useEffect, useState } from 'react'
import createQuote from '../../api/createQuote'
import updateQuote from '../../api/updateQuote'

interface IProps {
  data: IQuote
  onCancel: () => void
  onSave: (quote: IQuote, isAnUpdateEvent: boolean) => void
}

const Form = (props: IProps): ReactElement => {
  const { data = null, onCancel, onSave } = props
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

  const updateQuoteFromDB = async (quoteId: string): Promise<void> => {
    const result: IQuoteSaveResponse = await updateQuote(quoteId, author, quote)
    if (!result.error) {
      onSave(result, !!data)
    }
  }

  const createNewQuoteThenSaveToDB = async (): Promise<void> => {
    const result: IQuoteSaveResponse = await createQuote(author, quote)
    if (!result.error) {
      onSave(result, !!data)
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
