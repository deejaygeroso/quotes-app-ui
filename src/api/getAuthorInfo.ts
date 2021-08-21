import { IAuthorInfoResult, IResolve } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

const getAuthorInfo = async (author: string): Promise<IAuthorInfoResult> => {
  return new Promise((resolve: IResolve<IAuthorInfoResult>): void => {
    fetch(apiRoutes.getAuthorInfo, {
      body: JSON.stringify({
        author,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(async (response): Promise<void> => {
      const result: IAuthorInfoResult = await response.json()
      resolve(result)
    })
  })
}

export default getAuthorInfo
