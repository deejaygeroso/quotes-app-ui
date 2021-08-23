import { IQuote, IResolve } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

const searchQuote = async (searchInput: string): Promise<IQuote[]> => {
  return new Promise((resolve: IResolve<IQuote[]>): void => {
    fetch(apiRoutes.searchQuote, {
      body: JSON.stringify({
        searchInput,
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

export default searchQuote
