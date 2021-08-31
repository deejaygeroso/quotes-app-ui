import { ApiFetch } from '../common/lib'
import { IQuoteSaveResponse } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

interface IBody {
  _id: string
  author: string
  quote: string
}

const updateQuote = (_id: string, author: string, quote: string): Promise<IQuoteSaveResponse> => {
  const apiFetch = new ApiFetch()
  return apiFetch.put<IBody>(apiRoutes.quotes, {
    _id,
    author,
    quote,
  })
}

export default updateQuote
