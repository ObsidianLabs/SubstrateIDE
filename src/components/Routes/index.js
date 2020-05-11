import React, { Suspense, lazy } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import { Input, LoadingScreen } from '@obsidians/ui-components'

import BottomBar from './BottomBar'

Input.defaultProps = {
  type: 'text',
  autoComplete: 'off',
  autoCorrect: 'off',
  autoCapitalize: 'off',
  spellCheck: 'false'
}

const UserHomepage = lazy(() => import('./UserHomepage' /* webpackChunkName: "tabs" */))
const Project = lazy(() => import('./Project' /* webpackChunkName: "tabs" */))
const PolkadotJsApp = lazy(() => import('./PolkadotJsApp' /* webpackChunkName: "tabs" */))
const Network = lazy(() => import('./Network' /* webpackChunkName: "tabs" */))

export default function (props) {
  return (
    <React.Fragment>
      {props.children}
      <Suspense fallback={<LoadingScreen />}>
        <CacheSwitch>
          <Route
            exact
            path='/'
            render={() => <Redirect to='/guest' />}
          />
          <CacheRoute
            exact
            path='/explorer/:name?'
            component={PolkadotJsApp}
            className='p-relative w-100 h-100'
          />
          <CacheRoute
            exact
            path='/network/:network?'
            component={Network}
            className='p-relative w-100 h-100'
          />
          <Route
            exact
            path='/:username'
            component={UserHomepage}
            className='p-relative w-100 h-100'
          />
          <CacheRoute
            exact
            path='/:username/:project'
            cacheKey='project-editor'
            component={Project}
            className='p-relative w-100 h-100'
          />
        </CacheSwitch>
      </Suspense>
      <CacheRoute
        component={BottomBar}
        className='border-top-1 d-flex flex-row'
      />
    </React.Fragment>
  )
}
