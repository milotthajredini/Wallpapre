import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Favourites from './Favourites/Favourites'
import AllData from './AllData/AllData'

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path='/popular'>
          <AllData topic='nature' category='Popular' />
        </Route>
        <Route exact path='/new'>
          <AllData topic='new' category='New' />
        </Route>
        <Route exact path='/downloaded'>
          <AllData topic='downloaded' category='Downloaded' />
        </Route>
      </Switch>
    </>
  )
}

export default Routes
