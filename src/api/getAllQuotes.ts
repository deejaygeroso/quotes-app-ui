import { IQuote, IResolve } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

const getAllQuotes = async (): Promise<IQuote[]> => {
  return new Promise((resolve: IResolve<IQuote[]>): void => {
    fetch(apiRoutes.getAllQuotes).then(async (response): Promise<void> => {
      const result: IQuote[] = await response.json()
      resolve(result)
    })
  })
}

export default getAllQuotes
