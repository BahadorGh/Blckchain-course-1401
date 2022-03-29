# Sample-dapp project:
## Step 0. Create new folder named: sample-dapp(or clone this repo)
### - `mkdir sample-dapp`

## Step1. Create smart contract project(ex: truffle project):
Inside sample-dapp project, follow below steps:

### - `mkdir contracts`
### - `cd contracts`
### - `truffle init`
### - Copy `Contacts.sol` into contracts folder.
### - Create new file named: `2_deploy_contracts.js` inside migrations folder and put below codes in it:
```
const Contacts = artifacts.require("Contacts");

module.exports = function (deployer) {
  deployer.deploy(Contacts);
};
```

### - Edit your desire network in `truffle-config.js`
### - Finally, deploy the contract using `truffle migrate`

## Step2. Create your UI project(ex: react.js project):
### - `npx create-react-app contacts`
### - `cd contacts`
### - Inside src folder, create `config.js` file and insert contract abi and address into that as below:

```
export const CONTACT_ADDRESS = 'your deployed contract address'; //ex: '0x420094bF66CFD0e13b2b2EE96923c577e9e84637'

export const CONTACT_ABI = [.....]; // Notice: extract abi from build -> Contacts.json
```

### - Now go to src -> App.js and modify it as this repo.
### - Finally, `npm start`.
### - Enjoy! :-)


# Note: Fixing react.js web3:
## In current React.js versions(above 7, i guess)
we need to make some changes to prevent errors on polyfill:

## Steps
### 1. Install packages

- `yarn add --dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer`

OR

- `npm install --save-dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process`

### 2. Create a file with below contents, and name it as: config-overrides.js

```
const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    return config;
}
```

### 3. Change package.json scripts section as below:

```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```

### 4. Enjoy! :-)
