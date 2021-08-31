import { ApiFetch } from '../common/lib'
import { IQuote } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

interface IBody {
  searchInput: string
}

const searchQuote = async (searchInput: string): Promise<IQuote[]> => {
  const apiFetch = new ApiFetch()
  return apiFetch.post<IQuote[], IBody>(apiRoutes.quotesSearch, {
    searchInput,
  })
}

export default searchQuote
