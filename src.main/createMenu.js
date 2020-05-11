const os = require('os')
const { app, Menu, shell, dialog } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const ipc = require('./ipc')

module.exports = function createMenu () {
  const application = {
    label: 'Application',
    submenu: [
      { label: 'About', click: () => ipc.send('menu-click', 'about') },
      { type: 'separator' },
      {
        label: 'Clear All App Data...',
        click: async () => {
          const { response } = await dialog.showMessageBox({
            type: 'question',
            buttons: ['Confirm', 'Cancel'],
            defaultId: 1,
            message: 'All your data will be lost. Are you sure to continue?',
            cancelId: 1
          })
          if (response === 0) { // confirm
            const window = ipc.getWindow()
            if (window) {
              const session = window.webContents.session
              await session.clearStorageData()
              window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../build/index.html')}`)
            }
          }
        }
      },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() }
    ]
  }

  const edit = {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  }

  const view = {
    label: 'View',
    submenu: [
      { label: 'Increase Font Size', role: 'zoomin' },
      { label: 'Decrease Font Size', role: 'zoomout' },
      { label: 'Reset to Actual Size', role: 'resetzoom' }
    ]
  }

  const help = {
    label: 'Help',
    submenu: [
      { label: `Substrate IDE Telegram Group`, click: () => shell.openExternal('https://t.me/substrate_ide') },
    ]
  }

  const debug = {
    label: 'Debug',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' }
    ]
  }

  const template = [
    edit,
    view,
    help
  ]

  if (os.type() === 'Darwin') {
    template.unshift(application)
  } else {
    template.push(application)
  }

  isDev && template.push(debug)

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
