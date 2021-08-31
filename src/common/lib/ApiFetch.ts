/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

  public delete = async <Result>(apiRouteInput: string, idInput: string): Promise<Result> => {
    const deleteApiRoute = `${apiRouteInput}/${idInput}`
    return this.apiCall(deleteApiRoute, {
      method: this.methods.delete,
    })
  }

  public get = async <Result>(apiRouteInput: string): Promise<Result> => {
    return this.apiCall(apiRouteInput, {
      method: this.methods.get,
    })
  }

  public post = async <Result, Body>(apiRouteInput: string, bodyInput: Body): Promise<Result> => {
    return this.apiCall(apiRouteInput, {
      body: JSON.stringify({
        ...bodyInput,
      }),
      method: this.methods.post,
    })
  }

  public put = async <Result, Body>(apiRouteInput: string, bodyInput: Body): Promise<Result> => {
    return this.apiCall(apiRouteInput, {
      body: JSON.stringify({
        ...bodyInput,
      }),
      method: this.methods.put,
    })
  }

  protected apiCall = async <Result, Body>(apiRouteInput: string, optionsInput: Body): Promise<Result> => {
    const options = Object.assign({}, { headers: this.headers }, optionsInput)
    return new Promise((resolve: IResolve<Result>): void => {
      fetch(`${apiRouteInput}`, options).then(async (response): Promise<void> => {
        const result: Result = await response.json()
        resolve(result)
      })
    })
  }
}

export default ApiFetch
