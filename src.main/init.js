const { IpcChannel } = require('@obsidians/ipc')
const { AutoUpdate } = require('@obsidians/substrate-welcome')
const SubstrateCompilerManager = require('@obsidians/substrate-compiler')

let ipcChannel, autoUpdate, substrateCompilerManager
module.exports = function () {
  ipcChannel = new IpcChannel()
  autoUpdate = new AutoUpdate()
  substrateCompilerManager = new SubstrateCompilerManager()
}
