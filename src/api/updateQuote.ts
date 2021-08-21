import { IQuoteSaveResponse, IResolve } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

const updateQuote = (_id: string, author: string, quote: string): Promise<IQuoteSaveResponse> => {
  return new Promise((resolve: IResolve<IQuoteSaveResponse>): void => {
    fetch(apiRoutes.updateQuote, {
      body: JSON.stringify({
        _id,
        author,
        quote,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    }).then(async (response): Promise<void> => {
      const result: IQuoteSaveResponse = await response.json()
      resolve(result)
    })
  })
}

export default updateQuote
