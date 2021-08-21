import { IQuote, IResolve } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

const searchQuoteByAuthor = async (author: string): Promise<IQuote[]> => {
  return new Promise((resolve: IResolve<IQuote[]>): void => {
    fetch(apiRoutes.searchQuoteByAuthor, {
      body: JSON.stringify({
        author,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(async (response): Promise<void> => {
      const result: IQuote[] = await response.json()
      resolve(result)
    })
  })
}

export default searchQuoteByAuthor
