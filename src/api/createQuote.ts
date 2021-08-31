import { ApiFetch } from '../common/lib'
import { IQuoteSaveResponse } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

interface IBody {
  author: string
  quote: string
}

const createQuote = async (author: string, quote: string): Promise<IQuoteSaveResponse> => {
  const apiFetch = new ApiFetch()
  return apiFetch.post<IQuoteSaveResponse, IBody>(`${apiRoutes.quotes}`, {
    author,
    quote,
  })
}

export default createQuote
