import { IQuote, SortTypes } from '../../common/interfaces'

const sortQuotesAlphabetically = (sortBy: SortTypes, quotesInput: IQuote[]): IQuote[] => {
  const newSortedQuotes = [...quotesInput]
  const isAscending = sortBy === 'ascending'
  return newSortedQuotes.sort(function (a, b) {
    if (a.author < b.author) {
      return isAscending ? -1 : 1
    }
    if (a.author > b.author) {
      return isAscending ? 1 : -1
    }
    return 0
  })
}

export default sortQuotesAlphabetically
