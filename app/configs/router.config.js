import React from 'react'
import { Router, Route, IndexRoute, hashHistory/* , Redirect */ } from 'react-router'
import { isLogin } from '@configs/common'

import * as base from '@pages/base'
import * as menu from '@pages/menu'

const testComponent = () => <div>test Component </div>

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={base.app} onEnter={isLogin}>
      <IndexRoute component={base.example} />
      <Route path="/desk$/index" component={base.example} />
      <Route path="/menu1" component={menu.menu1} />
      <Route path="/menu2" component={menu.menu2} />
      {/* <Route path="/socketReceive" component={base.socketReceive} /> */}
      <Route path="/test" component={testComponent} />
    </Route>
    <Route path="/login" component={base.login} />
    <Route path="*" component={base.notfound} />
  </Router>
)
