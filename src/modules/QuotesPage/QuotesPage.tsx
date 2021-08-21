import { MdDeleteForever, MdEdit, MdPerson } from 'react-icons/md'
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react'
import { IQuote } from '../../common/interfaces'
import getAllQuotes from '../../api/getAllQuotes'
import './index.scss'

const QuotesPage: FunctionComponent = (): ReactElement => {
  const [listOfQuotes, setListOfQuotes] = useState<IQuote[]>([])

  const fetchAllQuotesFromDB = async (): Promise<void> => {
    const newListOfQuotes = await getAllQuotes()
    setListOfQuotes(newListOfQuotes)
  }

  useEffect(() => {
    fetchAllQuotesFromDB()
  }, [])

  return (
    <div className='quotes-page'>
      <h2>QuotesPage</h2>
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
  )
}

export default QuotesPage
