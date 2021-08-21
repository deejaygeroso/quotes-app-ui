import React, { ReactElement } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import QuotesPage from './modules/QuotesPage'
import './common/styles/app.scss'
import './common/styles/theme.scss'

const App = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <QuotesPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
