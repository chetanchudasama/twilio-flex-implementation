# Twilio Flex Plugin - Contact Center Boilerplate

This project is intended to be used as a boilerplate / skeleton for a Flex contact center.  
A number of basic configurations are assumed to be useful for many contact centers, so this repo has those pre-configured and ready to be re-purposed to new Flex plugin.

Please read through the usage guide to ensure the new project repo is configured correctly from the boilerplate.

## Pre-requisites

Flex plugins are now created by using the Twilio CLI. This interface is also used to run the plugin during development, and build / deploy for production.  
The CLI can be installed by following this guide: [CLI Quick Start](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli)  
Once installed, you will need to add the Flex plugin to enable the build / run scripts.  
[This guide](https://www.twilio.com/docs/flex/developer/plugins/cli/install) details the steps, but the install is as simple as running `twilio plugins:install @twilio-labs/plugin-flex@beta`.  

Now the CLI and plugin are installed, you need to link the Twilio CLI to a Twilio project.  
This needs to be run each time you link up to a new Twilio Flex project.  

1. Create a new profile `twilio profiles:create`
   1. When prompted enter the account sid for the Twilio Project
   2. When prompted enter the auth token for the Twilio Project
   3. When prompted enter a friendly name for the project
2. You can now list the available profiles with `twilio profiles:list`
3. If you profile is not marked as active, you can make it active with `twilio profiles:use <profile friendly name>`

You're now ready to develop Flex plugins.

## Usage

Follow these steps to load the boilerplate and get started developing a Flex Plugin:

1. Clone the project with  
    ```git clone https://ZingDevLimited@dev.azure.com/ZingDevLimited/Zing%20Internal/_git/plugin-cc-boilerplate```
2. Change the folder name to your new plugin name
    > Note: Flex plugins must start with 'plugin-' for their name
3. Update `package.json` in the root so the `name` field matches your folder name
4. Open a console in the project directory and run `npm i`
    > There is a post install step which prepares your local environment to run the plugin name. If you miss this step, you may have errors around missing plugins / directories
5. Delete the current `.git` folder to remove the template history
6. Setup git with `git init`
7. Add the remote with `git remote add origin <origin url>`
8. Create the main branch with `git checkout -b main`
9.  Create a commit with `git add .` and `git commit -m "message"`
10. Push the main branch up to the remote with `git push -u origin main`

Once complete, the new repo will be ready to go with the boilerplate contact center solution.

## Contributing to the Boilerplate Repo

This repo can be updated with new features / package versions etc when we decide it's a common feature for all users.  
Changes to the boilerplate will not update repositories based on this, so ensure the updates are carried out there too if needed.  

To contribute, checkout the repo as described in [Usage](#usage), but skip the renaming and git remote changes.  
Once the repo is checked out, you can simply run `npm i` from the root directory to install.  
Make a copy of `/public/appConfig.example.js` called `appConfig.js`, then `twilio flex:plugins:start` to run the Flex development server.  
Ensure you have connected the Twilio CLI to a valid project before you do this by following the steps in [Pre-requisites](#Pre-requisites)
