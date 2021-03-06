import { IDeleteQuoteResult, IQuote, SortTypes } from '../../common/interfaces'
import { MdDeleteForever, MdEdit, MdPerson } from 'react-icons/md'
import React, { ReactElement, useState } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/ti'
import { deleteQuote } from '../../api'
import './index.scss'

interface IProps {
  onDelete: (quoteId: string) => void
  onEdit: (quote: IQuote) => void
  onSort: (sortBy: SortTypes) => void
  onViewUserInfo: (author: string) => Promise<void>
  quotes: IQuote[]
  textToSearch: string
}

const Table = (props: IProps): ReactElement => {
  const { onDelete, onEdit, onSort, onViewUserInfo, quotes, textToSearch } = props
  const [sort, setSort] = useState<SortTypes>('')

  const handleDeleteQuote = async (quoteId: string): Promise<void> => {
    if (confirm('Are you sure you want to delete this quote')) {
      const result: IDeleteQuoteResult = await deleteQuote(quoteId)
      const isSuccessful = result.deletedCount === 1 && result.ok === 1

      if (isSuccessful) {
        onDelete(quoteId)
      }
    }
  }

  const handleSort = (sortBy: SortTypes): void => {
    setSort(sortBy)
    onSort(sortBy)
  }

  const renderSortIcons = (): ReactElement => {
    if (sort === 'ascending') {
      return (
        <span className='sort-icons' onClick={(): void => handleSort('')}>
          <TiArrowSortedUp />
        </span>
      )
    }
    if (sort === 'descending') {
      return (
        <span className='sort-icons' onClick={(): void => handleSort('ascending')}>
          <TiArrowSortedDown />
        </span>
      )
    }
    return (
      <span className='sort-icons' onClick={(): void => handleSort('descending')}>
        <TiArrowUnsorted />
      </span>
    )
  }

  const getHighlightedText = (text: string): ReactElement => {
    if (textToSearch === '') {
      return <p>{text}</p>
    }

    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${textToSearch})`, 'gi'))
    return (
      <p>
        {parts.map((part, i) => (
          <span key={i} className={part.toLowerCase() === textToSearch.toLowerCase() ? 'search-highlight' : ''}>
            {part}
          </span>
        ))}
      </p>
    )
  }

  return (
    <table id='quotes-page-table' className='card' cellSpacing='0' cellPadding='0'>
      <thead>
        <tr>
          <th>
            <span>Authors</span> {renderSortIcons()}
          </th>
          <th>Quotes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {quotes && quotes.length !== 0 ? (
          <>
            {quotes.map(
              (quote: IQuote, key: number): ReactElement => (
                <tr key={key}>
                  <td>{getHighlightedText(quote.author)}</td>
                  <td>{getHighlightedText(quote.quote)}</td>
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
          </>
        ) : (
          <tr className='no-record'>
            <td></td>
            <td>No Record Found</td>
            <td></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Table
