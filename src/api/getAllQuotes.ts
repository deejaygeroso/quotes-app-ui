import { ApiFetch } from '../common/lib'
import { IQuote } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

const getAllQuotes = async (): Promise<IQuote[]> => {
  const apiFetch = new ApiFetch()
  return apiFetch.get(apiRoutes.quotes)
}

export default getAllQuotes
