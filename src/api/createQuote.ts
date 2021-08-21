import { IQuoteSaveResponse, IResolve } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

const createQuote = async (author: string, quote: string): Promise<IQuoteSaveResponse> => {
  return new Promise((resolve: IResolve<IQuoteSaveResponse>): void => {
    fetch(apiRoutes.createQuote, {
      body: JSON.stringify({
        author,
        quote,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(async (response): Promise<void> => {
      const result: IQuoteSaveResponse = await response.json()
      resolve(result)
    })
  })
}

export default createQuote
