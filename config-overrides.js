const os = require('os')
const path = require('path')
const webpack = require('webpack')
const {
  override,
  addWebpackAlias,
  addWebpackPlugin
} = require('customize-cra')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

function findWebpackPlugin (plugins, pluginName) {
  return plugins.find(plugin => plugin.constructor.name === pluginName)
}

function overrideProcessEnv (value) {
  return config => {
    const plugin = findWebpackPlugin(config.plugins, 'DefinePlugin')
    const processEnv = plugin.definitions['process.env'] || {}
    plugin.definitions['process.env'] = {
      ...processEnv,
      ...value
    }
    return config
  }
}

const overrides = [
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src/lib'),
    '@obsidians/welcome': `@obsidians/${process.env.BUILD}-welcome`,
    '@obsidians/header': `@obsidians/${process.env.BUILD}-header`,
    '@obsidians/project': `@obsidians/${process.env.BUILD}-project`,
    '@obsidians/instances': `@obsidians/${process.env.BUILD}-instances`,
    '@obsidians/bottombar': `@obsidians/${process.env.BUILD}-bottombar`,
    '@obsidians/keypair': `@obsidians/${process.env.BUILD}-keypair`,
  }),
  overrideProcessEnv({
    BUILD: JSON.stringify(process.env.BUILD),
    PROJECT_NAME: JSON.stringify(process.env.PROJECT_NAME),
    OS_IS_LINUX: JSON.stringify(os.type() === 'Linux'),
  }),
]

overrides.push(addWebpackPlugin(
  new MonacoWebpackPlugin({
    languages: ['json', 'javascript', 'typescript', 'css', 'html', 'markdown', 'c', 'cpp', 'shell']
  })
))

module.exports = {
  webpack: override(...overrides)
}
