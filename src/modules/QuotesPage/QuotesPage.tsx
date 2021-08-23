import { IAuthorInfoResult, IQuote, SortTypes } from '../../common/interfaces'
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react'
import { getAllQuotes, getAuthorInfo, searchQuoteByAuthor } from '../../api'
import AuthorInfo from '../AuthorInfo'
import Form from '../Form'
import Modal from '../Modal'
import Table from '../Table/Table'
import sortQuotesAlphabetically from './sortQuotesAlphabetically'
import './index.scss'

const QuotesPage: FunctionComponent = (): ReactElement => {
  const [listOfQuotes, setListOfQuotes] = useState<IQuote[]>([])
  const [sortedQuotes, setSortedQuotes] = useState<IQuote[]>([])
  const [textToSearch, setTextToSearch] = useState('')
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

  const sortQuotes = (sortBy: SortTypes): void => {
    if (sortBy) {
      const newSortedQuotes = sortQuotesAlphabetically(sortBy, listOfQuotes)
      setSortedQuotes(newSortedQuotes)
    } else {
      setSortedQuotes([])
    }
  }

  const handleSearchQuoteByAuthor = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const authorValue = event.target.value
    setTextToSearch(authorValue)
    const listOfQuotesSearched = await searchQuoteByAuthor(authorValue)
    setListOfQuotes(listOfQuotesSearched)
    setSortedQuotes([])
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
            <Form
              data={quoteToBeUpdated}
              onCancel={hideModal}
              onCreate={addNewQuoteToTheListOfQuotes}
              onUpdate={updateAQuoteFromTheListOfQuotes}
            />
          ) : (
            <AuthorInfo authorInfo={authorInfo} />
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
              value={textToSearch}
            />
          </div>
          <div>
            <button className='add-button' onClick={showAddQuoteForm}>
              Add Quote
            </button>
          </div>
        </div>
        <Table
          quotes={sortedQuotes.length !== 0 ? sortedQuotes : listOfQuotes}
          onDelete={removeDeletedQuoteFromQuotesList}
          onEdit={showUpdateQuoteForm}
          onSort={sortQuotes}
          onViewUserInfo={showUserInfoModal}
          textToSearch={textToSearch}
        />
      </div>
    </div>
  )
}

export default QuotesPage
