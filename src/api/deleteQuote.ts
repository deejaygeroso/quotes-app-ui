import { IDeleteQuoteResult, IResolve } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

const deleteQuote = async (quoteId: string): Promise<IDeleteQuoteResult> => {
  return new Promise((resolve: IResolve<IDeleteQuoteResult>): void => {
    fetch(`${apiRoutes.deleteQuote}/${quoteId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then(async (response): Promise<void> => {
      const result: IDeleteQuoteResult = await response.json()
      resolve(result)
    })
  })
}

export default deleteQuote
