import React, { ReactElement } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import About from './modules/About'
import Home from './modules/Home'
import './common/styles/app.css'

const App = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
