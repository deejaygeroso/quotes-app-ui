import { ApiFetch } from '../common/lib'
import { IDeleteQuoteResult } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

const deleteQuote = async (quoteId: string): Promise<IDeleteQuoteResult> => {
  const apiFetch = new ApiFetch()
  return apiFetch.delete(apiRoutes.quotes, quoteId)
}

export default deleteQuote
