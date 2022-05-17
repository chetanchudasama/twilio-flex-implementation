# Customer Journey Flex Plugin

The Customer Journey Plugin is a [Twilio Flex](https://www.twilio.com/flex) plugin that handles the wizard for guiding an agent through a full customer journey, from qualifying the opportunity to searching for a suitable car, quoting for the chose car through to the payout stage.

## Contents

## Pre-requisites

See Pre-requisites section in the [main README.md file](../../README.md).

## Usage

### Environment Variables

The `.env.example` file provides details of what environment variables need to be set.

The easiest way to set these is to copy the `.env.example` file and rename the copy to `.env`, then set the values to use when developing locally or building the plugin.

> Note: `.env` is excluded from git as there is no need to commit real environment variables to source control.

> Note: As you are building a SPA, please `DO NOT` put any secrets in these files as they will be accessible publicly once deployed.

Populate the variables in `.env` as follows:

| Variable                                    | Value                                                                                                                                                     | Note                                                                                                                                                                                                              |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| REACT_APP_DEVELOPMENT_MODE                  | Set this to true if testing the plugin locally or false if deploying to a production environment                                                          | The variable is used to resize the Panel in the Agent View. This only applies when the plugin is run/deployed on its own, as other plugins on the CF247 platform are currently in charge of these customisations. |
| REACT_APP_API_BASE_URL                      | URL of the API the plugin will be using e.g. `https://cf247-api-dev.azurewebsites.net`                                                                    | The API will be called to get information about the current customer and application. The Flex token of the logged in user will be passed as a Bearer token to be used for authentication and authorization.      |
| REACT_APP_CAR_SEARCH_PAGE_SIZE              | The number of records per page to be retrieved from the API when searching for cars                                                                       | If not set or invalid, the page size is defaulted to 10                                                                                                                                                           |
| REACT_APP_AGENT_GUIDE_FOR_LICENSE           | The text to be displayed to the agent if the license question in the Qualify screen has an answer of 'No'                                                 | If not filled in, no text will be displayed                                                                                                                                                                       |
| REACT_APP_AGENT_GUIDE_FOR_ADDRESS           | The text to be displayed to the agent if the address question in the Qualify screen has an answer of 'No'                                                 | If not filled in, no text will be displayed                                                                                                                                                                       |
| REACT_APP_AGENT_GUIDE_FOR_INCOME            | The text to be displayed to the agent if the income question in the Qualify screen has an answer of 'No'                                                  | If not filled in, no text will be displayed                                                                                                                                                                       |
| REACT_APP_AGENT_GUIDE_FOR_EMPLOYMENT        | The text to be displayed to the agent if the employment question in the Qualify screen has an answer of 'No'                                              | If not filled in, no text will be displayed                                                                                                                                                                       |
| REACT_APP_AGENT_GUIDE_FOR_ALREADY_FOUND_CAR | The text to be displayed to the agent if the question regarding whether the customer has already found a car in the Qualify screen has an answer of 'Yes' | If not filled in, no text will be displayed                                                                                                                                                                       |

## Deployment

To build the plugin, run the following command in the repository's main folder:

`yarn plugin-customer-journey build`

## Implementation Details

This section will contain any specific implementation details that you should be aware of for future development.  
Primarily this will include cases where we have overriden the default functionality of a Flex action to better tailor it to CarFinance 247's business logic.

### DPA Popup

This functionality is fired from a listener on the `afterAcceptTask` Flex action. When a task is accepted, if the `dpaPassed` task attribute does not indicate that the customer has already passed the DPA checks during the IVR stage, the DPA popup is shown to the agent.

### Custom Actions

**For moving through the wizard between the Car Search, Quotes and Deal Sheet steps**, 3 custom actions are registered in Flex: `MoveToCarSearchStep`, `MoveToQuoteStep` and `MoveToDealSheetStep`.

**In order to open an application's details from other plugins**, a custom `openApplication` action is registered in Flex. When invoked, it receives as payload:

- an "applicationId" parameter of type number and
- an optional "type" parameter of type string

e.g. `Flex.Actions.invokeAction("openApplication", { applicationId: 1234 });`
or `Flex.Actions.invokeAction("openApplication", { applicationId: 1234, type: "LG" });`

If the current view is the Agent Desktop, the details of the application whose id was passed in the payload will be retrieved from the API and displayed. If the type parameter is `"LG"`, then the Lead Generation screen will be shown, otherwise, the customer journey wizard will be shown.

If the current view is not the Agent Desktop, the plugin invoking the `openApplication` action must first invoke the standard `NavigateToView` Flex action (e.g `Actions.invokeAction("NavigateToView", { viewName: "agent-desktop" });`).

**In order to navigate to the screens available from the Customer Banner menu options**, a custom `updateCustomerDetail` action is registered that receives as payload the type of detail to load (CustomerDetail, BankDetails, AddressHistory or EmploymentHistory) and loads in place of the wizard the relevant screen.

> Note: registered actions must be unique across all plugins in Flex to avoid conflicts between the plugins.

### Standard Action Invocation

When clicking on the phone icon next to the dealer's phone number when searching for cars or creating a quote or the customer's mobile number in the Customer Banner, if the agent is in the Available activity and does not have any other voice tasks assigned to them, an outbound call is initated using the standard Flex `StartOutboundCall` action.
