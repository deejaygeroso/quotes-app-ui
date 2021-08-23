/* eslint-disable @typescript-eslint/no-explicit-any */
import { IResolve } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

// expecting response IQuoteSaveResponse but due to testing issue, I have to manually set this to any
const updateQuote = (_id: string, author: string, quote: string): Promise<any> => {
  return new Promise((resolve: IResolve<any>): void => {
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
      const result: any = await response.json()
      resolve(result)
    })
  })
}

export default updateQuote
