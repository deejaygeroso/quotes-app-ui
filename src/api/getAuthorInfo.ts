import { ApiFetch } from '../common/lib'
import { IAuthorInfoResult } from '../common/interfaces'
import { apiRoutes } from '../common/constants'

interface IBody {
  author: string
}

const getAuthorInfo = async (author: string): Promise<IAuthorInfoResult> => {
  const apiFetch = new ApiFetch()
  return apiFetch.post<IBody>(apiRoutes.author, {
    author,
  })
}

export default getAuthorInfo
