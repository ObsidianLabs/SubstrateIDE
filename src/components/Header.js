import React, { PureComponent } from 'react'

import { connect } from '@obsidians/redux'

import { Header, NavGuard } from '@obsidians/header'
import { actions } from '@obsidians/project'

const networks = [
  {
    id: 'local',
    name: 'Local',
    fullName: 'Local Network',
    icon: 'fas fa-laptop-code',
    notification: 'Switched to <b>Local</b> network.',
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    group: 'default',
    endpoint: 'http://localhost:8888',
    endpoints: [{
      url: 'http://localhost:8888'
    }]
  }
]

class HeaderWithRedux extends PureComponent {
  componentDidMount () {
    actions.history = this.props.history
    this.navGuard = new NavGuard(this.props.history)
  }

  render () {
    console.debug('[render] HeaderWithRedux')
    const { projects } = this.props
    const selectedProject = projects.get('selected')?.toJS() || {}

    return (
      <Header
        projects={projects.get('local').toJS()}
        selectedProject={selectedProject}
        network={networks[0]}
        networkList={networks}
      />
    )
  }
}

export default connect(['projects'])(HeaderWithRedux)
