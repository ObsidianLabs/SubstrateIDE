import React, { Component } from 'react'

import { LoadingScreen } from '@obsidians/ui-components'

export default class PolkadotJsApp extends Component {
  constructor (props) {
    super(props)
    this.webview = React.createRef()
  }

  render () {
    return (
      <div className='w-100 h-100'>
        <LoadingScreen />
        <webview
          ref={this.webview}
          className='p-absolute w-100 h-100 border-0'
          style={{ top: 0 }}
          src='https://polkadot.js.org/apps/#/accounts?rpc=ws://127.0.0.1:9944'
        />
      </div>
    )
  }
}
