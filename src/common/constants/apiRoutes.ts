const apiURL = 'http://localhost:8000'

const apiRoute = {
  createQuote: `${apiURL}/api/createQuote`,
  deleteQuote: `${apiURL}/api/deleteQuote`,
  getAllQuotes: `${apiURL}/api/getAllQuotes`,
  getAuthorInfo: `${apiURL}/api/getAuthorInfo`,
  searchQuote: `${apiURL}/api/searchQuote`,
  updateQuote: `${apiURL}/api/updateQuote`,
}

export default apiRoute
