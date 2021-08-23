import { IDeleteQuoteResult, IQuote } from '../../common/interfaces'
import { MdDeleteForever, MdEdit, MdPerson } from 'react-icons/md'
import React, { ReactElement } from 'react'
import { deleteQuote } from '../../api'
import './index.scss'

interface IProps {
  onDelete: (quoteId: string) => void
  onEdit: (quote: IQuote) => void
  onViewUserInfo: (author: string) => Promise<void>
  quotes: IQuote[]
}

const Table = (props: IProps): ReactElement => {
  const { onDelete, onEdit, onViewUserInfo, quotes } = props

  const handleDeleteQuote = async (quoteId: string): Promise<void> => {
    if (confirm('Are you sure you want to delete this quote')) {
      const result: IDeleteQuoteResult = await deleteQuote(quoteId)
      const isSuccessful = result.deletedCount === 1 && result.ok === 1

      if (isSuccessful) {
        onDelete(quoteId)
      }
    }
  }

  return (
    <table id='quotes-page-table' className='card' cellSpacing='0' cellPadding='0'>
      <thead>
        <tr>
          <th>Authors</th>
          <th>Quotes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {quotes.map(
          (quote: IQuote, key: number): ReactElement => (
            <tr key={key}>
              <td>{quote.author}</td>
              <td>{quote.quote}</td>
              <td>
                <div>
                  <span
                    onClick={(): Promise<void> => onViewUserInfo(quote.author)}
                    className='action-button user-info-button'>
                    <MdPerson />
                  </span>
                  <span onClick={(): void => onEdit(quote)} className='action-button edit-button'>
                    <MdEdit />
                  </span>
                  <span
                    onClick={(): Promise<void> => handleDeleteQuote(quote._id)}
                    className='action-button delete-button'>
                    <MdDeleteForever />
                  </span>
                </div>
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  )
}

export default Table
