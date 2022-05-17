# CarFinance 247 Twilio Flex Solution

This project contains the Twilio Flex implementation for the CarFinance 247 solution. It includes:

- a library of [common components](common/components/README.md) to be used across multiple plugins
- the [Customer Journey Flex plugin](plugins/plugin-customer-journey/README.md)

The sections below detail how to setup the project for local development, and the steps required to deploy this to a Twilio Flex account.

## Pre-requisites

### Flex plugins pre-requisites

Flex plugins are now created by using the Twilio CLI. This interface is also used to run the plugin during development, and build / deploy for production.  
The CLI can be installed by following this guide: [CLI Quick Start](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli)  
Once installed, you will need to add the Flex plugin extension to enable the build / run scripts.  
[This guide](https://www.twilio.com/docs/flex/developer/plugins/cli/install) details the steps, but the install is as simple as running `twilio plugins:install @twilio-labs/plugin-flex`.

Now the CLI and plugin are installed, you need to link the Twilio CLI to your Twilio project.

1. Create a new profile `twilio profiles:create`
   1. When prompted enter the account sid for the Twilio Project
   2. When prompted enter the auth token for the Twilio Project
   3. When prompted enter a friendly name for the project
2. You can now list the available profiles with `twilio profiles:list`
3. If you profile is not marked as active, you can make it active with `twilio profiles:use <profile friendly name>`

You're now ready to work with Flex plugins.

### Flex React Version

The Flex Plugins are written using the latest version of `react` currently supported by Twilio Flex (`v16.13.1`). Please follow [Twilio's instructions](https://www.twilio.com/docs/flex/developer/plugins/react-versions#setting-the-react-version-within-flex) to configure the Flex platform to use latest version of React supported by Twilio.

### Other

The project uses yarn v1 workspaces. You will need to install [yarn v1.\*](https://classic.yarnpkg.com/en/docs/install/#windows-stable).

## Usage

Follow these steps to run the plugins locally.

### Config files

1. Go to each plugin's root folders, within the `plugins` subfolder.
2. Create a `.env` file in the root of the directory by copying `.env.example`.
3. Populate the `.env` file as instructed in that plugin's `README.md` file.
4. Copy `appConfig.example.js` file within the `public` subfolder and rename it to `appConfig.js`. Make any changes to the default `appConfig.js`, see [Flex Configuration Documentation](https://www.twilio.com/docs/flex/developer/ui/configuration#configuration-object).

### Scripts

> Note: All scripts must be run in the root folder of the repository, at the same level as `package.json`.
> Note: You may need to run these commands in `git bash` rather than `powershell` due to windows/unix cross platform command requirements.

1. run `yarn install` to install the dependencies required for the common library.
2. run `yarn build` to build the common library
3. run `yarn <plugin-name> install:dev` to install the dev dependencies for that plugin (such as the env-cmd package). e.g. `yarn plugin-customer-journey install:dev`
4. run `yarn <plugin-name> start` to start the plugin locally (make sure you fist have the .env file required for that plugin and you have the appConfig.js file in the public folder for that plugin). e.g `yarn plugin-customer-journey start`
5. run `yarn <plugin-name> build` to build the plugin (make sure you fist have the .env file required for that plugin and you have the appConfig.js file in the public folder for that plugin). e.g `yarn plugin-customer-journey build`
6. run `yarn lint-plugins` to lint the plugins folder or `yarn lint-common` to lint the common folder. This will run linting on the specific folders with the project configuration, and will flag any errors or
   warnings in the command line.

## Running Tests

### Running common library test cases

From the root directory of the repository, run `yarn common-components-test`.

### Running Flex plugins unit tests

From the root directory of the repository, run `yarn <plugin name> test` e.g. `yarn plugin-customer-journey test`.

## Making changes

When making changes to the common libraries, you'll need to run step 2 again, as shown in the [Scripts](#scripts) section, to build the library, then start the plugin once more.
