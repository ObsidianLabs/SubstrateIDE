import React, { PureComponent } from 'react'

import {
  Screen,
  Button,
} from '@obsidians/ui-components'

import { InstanceList } from '@obsidians/instances'

import { withRouter } from 'react-router-dom'

import { connect } from '@/redux'

const onLifecycle = ({ lifecycle, runningInstance }) => {
  switch (lifecycle) {
    case 'stopped':
      // api.redux.dispatch('LOCAL_NODE_STOPPED', { instanceName: runningInstance })
      break
    case 'started':
      // api.redux.dispatch('LOCAL_NODE_STARTED', { instanceName: runningInstance })
      break
    default:
  }
}

class Network extends PureComponent {
  state = {
    active: true
  }

  componentDidMount () {
    this.props.cacheLifecycles.didCache(() => this.setState({ active: false }))
    this.props.cacheLifecycles.didRecover(() => this.setState({ active: true }))
  }

  render () {
    const projectRoot = this.props.projects.getIn(['selected', 'path'])
    const version = this.props.globalConfig.get('compilerVersion')

    if (!projectRoot) {
      return (
        <Screen>
          <h4 className='display-4'>No Project</h4>
          <p className='lead'>Please open a substrate project.</p>
          <hr />
          <span>
            <Button color='primary' onClick={() => this.props.history.push(`/guest`)}>
              Go to Project
            </Button>
          </span>
        </Screen>
      )
    }

    return (
      <InstanceList
        network={this.props.network}
        version={version}
        projectRoot={`${projectRoot}/node`}
        onLifecycle={onLifecycle}
        active={this.state.active}
      />
    )
  }
}


export default connect([
  'projects',
  'globalConfig',
  'network',
])(withRouter(Network))
