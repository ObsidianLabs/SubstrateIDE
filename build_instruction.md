# Run or build Substrate IDE from source

## Required

- [Node.js v12](https://nodejs.org/en/)
- [Git](https://git-scm.com)
- [Yarn](https://yarnpkg.com)

## Preparations

1. Create a new folder `substrate` and switch to it

2. Run `git clone` to clone 3 repositories under `substrate` folder:

``` bash
$ git clone https://github.com/ObsidianLabs/SubstrateIDE.git
$ git clone https://github.com/ObsidianLabs/substrate-components.git
$ git clone https://github.com/ObsidianLabs/electron-components.git
```

3. Switch to `electron-components` folder and run `yarn && yarn build` to install and compile dependencies of *electron-components*

4. Switch to `substrate-components` folder and run `yarn && yarn build` to install and compile dependencies of *substrate-components*

5. Run `git submodule update --init` to download *polkadot-js* extension

6. Switch to `SubstrateIDE/extensions/polkadot-js` folder and run `yarn && yarn build` to install and compile dependencies of *polkadot-js*

7. Switch to `SubstrateIDE` folder and run `yarn` to install dependencies of *Substrate IDE*

8. The production version of Substrate IDE uses [Font Awesome Pro](https://fontawesome.com/pro). If you want to run or build Substrate IDE with the pro version, please open `package.json` and replace `@fortawesome/fontawesome-free` with `@fortawesome/fontawesome-pro`, and run `yarn` again. You also need to provide your pro license as instructed [here](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers#installing-pro).

## Run Substrate IDE in dev mode

When all the dependencies are ready, switch to `SubstrateIDE` folder and run `yarn dev:main` and `yarn dev:react` in two separate terminals. The first command would start the electron application, and the second would start the react project that provides the user interface.

## Build Substrate IDE

When all the dependencies are ready, switch to `SubstrateIDE` folder and run `yarn dist` to build Substrate IDE as a standalone application. Wait until it finishes. The built files can be found under `SubstrateIDE/dist` folder.


