/* eslint-disable @typescript-eslint/no-explicit-any */
import { IResolve } from '../interfaces'

class ApiFetch {
  protected headers = {
    'Content-Type': 'application/json',
  }

  protected methods = {
    delete: 'DELETE',
    get: 'GET',
    post: 'POST',
    put: 'PUT',
  }

  public delete = async (apiRouteInput: string, idInput: string): Promise<any> => {
    const deleteApiRoute = `${apiRouteInput}/${idInput}`
    return this.apiCall(deleteApiRoute, {
      method: this.methods.delete,
    })
  }

  public get = async (apiRouteInput: string): Promise<any> => {
    return this.apiCall(apiRouteInput, {
      method: this.methods.get,
    })
  }

  public post = async <Body>(apiRouteInput: string, bodyInput: Body): Promise<any> => {
    return this.apiCall(apiRouteInput, {
      body: JSON.stringify({
        ...bodyInput,
      }),
      method: this.methods.post,
    })
  }

  public put = async <Body>(apiRouteInput: string, bodyInput: Body): Promise<any> => {
    return this.apiCall(apiRouteInput, {
      body: JSON.stringify({
        ...bodyInput,
      }),
      method: this.methods.put,
    })
  }

  protected apiCall = async <Body>(apiRouteInput: string, optionsInput: Body): Promise<any> => {
    const options = Object.assign({}, { headers: this.headers }, optionsInput)
    return new Promise((resolve: IResolve<any>): void => {
      fetch(`${apiRouteInput}`, options).then(async (response): Promise<void> => {
        const result: any = await response.json()
        resolve(result)
      })
    })
  }
}

export default ApiFetch
