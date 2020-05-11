import React, { Component, Suspense, lazy } from 'react'

import fileOps from '@obsidians/file-ops'
import { NotificationSystem } from '@obsidians/notification'
import Welcome, { checkDependencies, GlobalModals, autoUpdater } from '@obsidians/welcome'
import { LoadingScreen } from '@obsidians/ui-components'

import { store, reduxLoaded, Provider, dispatch } from '@/redux'
import '@/menu'

import Routes from './components/Routes'
import icon from './components/icon.png'
const Header = lazy(() => import('./components/Header' /* webpackChunkName: "components" */))

export default class ReduxApp extends Component {
  state = {
    loaded: false,
    dependencies: false
  }

  async componentDidMount () {
    await reduxLoaded().then(onReduxLoaded)
    this.refresh()
  }

  refresh = async () => {
    const dependencies = await checkDependencies()
    this.setState({ loaded: true, dependencies })
    autoUpdater.check()
  }

  skip = () => {
    this.setState({ loaded: true, dependencies: true })
  }

  render () {
    if (!this.state.loaded) {
      return <LoadingScreen />
    }

    if (!this.state.dependencies) {
      return (
        <Suspense fallback={<LoadingScreen />}>
          <Welcome isReady={checkDependencies} onGetStarted={this.skip} />
          <NotificationSystem />
          <GlobalModals icon={icon} />
        </Suspense>
      )
    }

    return (
      <Provider store={store}>
        <div
          className='body'
          style={{ paddingTop: this.state.dependencies ? '49px' : '0' }}
        >
          <Routes>
            <Header history={this.props.history} />
            <NotificationSystem />
            <GlobalModals icon={icon} />
          </Routes>
        </div>
      </Provider>
    )
  }
}

async function onReduxLoaded () {
  const version = fileOps.current.getAppVersion()
  dispatch('SET_VERSION', { version })
}
