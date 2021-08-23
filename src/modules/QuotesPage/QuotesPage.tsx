import { IAuthorInfoResult, IQuote } from '../../common/interfaces'
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react'
import { getAllQuotes, getAuthorInfo, searchQuoteByAuthor } from '../../api'
import Form from '../Form'
import Modal from '../Modal'
import Table from '../Table/Table'
import './index.scss'

const QuotesPage: FunctionComponent = (): ReactElement => {
  const [listOfQuotes, setListOfQuotes] = useState<IQuote[]>([])
  const [authorToBeSearched, setAuthorToBeSearched] = useState('')
  const [authorInfo, setAuthorInfo] = useState<IAuthorInfoResult>(null)

  // state used on modal
  const [quoteToBeUpdated, setQuoteToBeUpdated] = useState<IQuote>(null)
  const [isModalVisible, setModalVisibility] = useState(false)
  const [isFormVisible, setFormVisibility] = useState(false)

  const showModal = () => {
    setModalVisibility(true)
  }

  const hideModal = (): void => {
    setModalVisibility(false)
    setAuthorInfo(null)
  }

  const showUpdateQuoteForm = (quoteChosenToBeUpdated: IQuote): void => {
    setQuoteToBeUpdated(quoteChosenToBeUpdated)
    setFormVisibility(true)
    showModal()
  }

  const showAddQuoteForm = (): void => {
    setQuoteToBeUpdated(null)
    setFormVisibility(true)
    showModal()
  }

  const showUserInfoModal = async (author: string): Promise<void> => {
    const authorInfoResult = await getAuthorInfo(author)
    setAuthorInfo(authorInfoResult)
    setFormVisibility(false)
    showModal()
  }

  const handleSearchQuoteByAuthor = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const authorValue = event.target.value
    setAuthorToBeSearched(authorValue)
    const listOfQuotesSearched = await searchQuoteByAuthor(authorValue)
    setListOfQuotes(listOfQuotesSearched)
  }

  const updateAQuoteFromTheListOfQuotes = (newSavedQuote: IQuote): void => {
    const newListOfQuotes = listOfQuotes.map((quote: IQuote): IQuote => {
      if (quote._id === newSavedQuote._id) {
        return newSavedQuote
      }
      return quote
    })
    setListOfQuotes(newListOfQuotes)
    hideModal()
  }

  const addNewQuoteToTheListOfQuotes = (newCreatedQuote: IQuote): void => {
    const newListOfQuotes = [newCreatedQuote, ...listOfQuotes]
    setListOfQuotes(newListOfQuotes)
    hideModal()
  }

  const handleOnSave = (newSavedQuote: IQuote, isAnUpdateEvent: boolean): void => {
    if (isAnUpdateEvent) {
      updateAQuoteFromTheListOfQuotes(newSavedQuote)
    } else {
      addNewQuoteToTheListOfQuotes(newSavedQuote)
    }
  }

  const removeDeletedQuoteFromQuotesList = async (quoteId: string): Promise<void> => {
    const newListOfQuotes = listOfQuotes.filter((quote: IQuote): boolean => quoteId !== quote._id)
    setListOfQuotes(newListOfQuotes)
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
        <>
          {isFormVisible ? (
            <Form data={quoteToBeUpdated} onCancel={hideModal} onSave={handleOnSave} />
          ) : (
            <div id='author-info'>
              {authorInfo && authorInfo.info ? (
                <>
                  <h2>{authorInfo.author}</h2>
                  <p>{authorInfo.info}</p>
                </>
              ) : (
                <>
                  <p>Author info not found on wikipedia</p>
                </>
              )}
            </div>
          )}
        </>
      </Modal>

      <div>
        <div className='advance-tools'>
          <div>
            <input
              type='text'
              id='search-author'
              name='searchAuthor'
              onChange={handleSearchQuoteByAuthor}
              placeholder='Search by author name...'
              value={authorToBeSearched}
            />
          </div>
          <div>
            <button className='add-button' onClick={showAddQuoteForm}>
              Add Quote
            </button>
          </div>
        </div>
        <Table
          onDelete={removeDeletedQuoteFromQuotesList}
          onEdit={showUpdateQuoteForm}
          onViewUserInfo={showUserInfoModal}
        />
      </div>
    </div>
  )
}

export default QuotesPage
