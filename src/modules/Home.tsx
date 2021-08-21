import React, { FunctionComponent, ReactElement } from 'react'
import { Navigation } from '../common/components'

const Home: FunctionComponent = (): ReactElement => {
  return (
    <div>
      <Navigation />
      <h2>Home</h2>
    </div>
  )
}

export default Home
