import IQuote from './IQuote'

interface IQuoteSaveResponse extends IQuote {
  error?: string
}

export default IQuoteSaveResponse
