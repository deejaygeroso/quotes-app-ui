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

  const showModal = () => {
    setModalVisibility(true)
  }

  const hideModal = (): void => {
    setModalVisibility(false)
  }

  const handleOnSave = (): void => {
    // handle save
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
        <Form onCancel={hideModal} onSave={handleOnSave} />
      </Modal>

      <div>
        <div className='advance-tools'>
          <div>
            <input type='text' id='search-author' name='searchAuthor' placeholder='Search by author...' />
          </div>
          <div>
            <button className='add-button' onClick={showModal}>
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
                    <span>
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
