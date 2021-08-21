import { MdDeleteForever, MdEdit, MdPerson } from 'react-icons/md'
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react'
import Form from '../Form'
import { IQuote } from '../../common/interfaces'
import Modal from '../Modal'
import getAllQuotes from '../../api/getAllQuotes'
import './index.scss'

const QuotesPage: FunctionComponent = (): ReactElement => {
  const [listOfQuotes, setListOfQuotes] = useState<IQuote[]>([])
  const [isModalVisible, setModalVisibility] = useState(false)
  const [quoteToBeUpdated, setQuoteToBeUpdated] = useState<IQuote>(null)

  const showModal = () => {
    setModalVisibility(true)
  }

  const hideModal = (): void => {
    setModalVisibility(false)
  }

  const showUpdateQuoteForm = (quoteChosenToBeUpdated: IQuote): void => {
    setQuoteToBeUpdated(quoteChosenToBeUpdated)
    showModal()
  }

  const showAddQuoteForm = (): void => {
    setQuoteToBeUpdated(null)
    showModal()
  }

  const handleOnSave = (newSavedQuote: IQuote, isAnUpdateEvent: boolean): void => {
    if (isAnUpdateEvent) {
      const newListOfQuotes = listOfQuotes.map((quote: IQuote): IQuote => {
        if (quote._id === newSavedQuote._id) {
          return newSavedQuote
        }
        return quote
      })
      setListOfQuotes(newListOfQuotes)
    } else {
      const newListOfQuotes = [newSavedQuote, ...listOfQuotes]
      setListOfQuotes(newListOfQuotes)
    }
    hideModal()
  }

  const fetchAllQuotesFromDB = async (): Promise<void> => {
    const newListOfQuotes = await getAllQuotes()
    setListOfQuotes(newListOfQuotes)
  }

  useEffect(() => {
    fetchAllQuotesFromDB()
  }, [])

  return (
    <div className='quotes-page'>
      <h2 className='title'>Tender Quotes</h2>
      <Modal hideModal={hideModal} isVisible={isModalVisible}>
        <Form data={quoteToBeUpdated} onCancel={hideModal} onSave={handleOnSave} />
      </Modal>

      <div>
        <div className='advance-tools'>
          <div>
            <input type='text' id='search-author' name='searchAuthor' placeholder='Search by author...' />
          </div>
          <div>
            <button className='add-button' onClick={showAddQuoteForm}>
              Add Quote
            </button>
          </div>
        </div>
        <table id='quotes-page-table'>
          <thead>
            <tr>
              <th>Authors</th>
              <th>Quotes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listOfQuotes.map(
              (quote: IQuote, key: number): ReactElement => (
                <tr key={key}>
                  <td>{quote.author}</td>
                  <td>{quote.quote}</td>
                  <td>
                    <span onClick={(): void => showUpdateQuoteForm(quote)} className='action-button edit-button'>
                      <MdEdit />
                    </span>
                    <span>
                      <MdDeleteForever />
                    </span>
                    <span>
                      <MdPerson />
                    </span>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default QuotesPage
