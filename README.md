# Getting Started with 1upHealth Dashboard

The 1upHealth Dashboard app takes you through a workflow beginning with a user ID. After entering a user ID, the app will generate an access token which will be passed to all subsequent API calls. You'll be given a "Connect to Cerner" link, to log in to your Cerner health system and approve access to medical data.

After approving access, return to the dashboard and press the "Get patient ID" button to retrieve the patient ID of the patient in the Cerner system.
Then, you'll be prompted with a button to get all data for that patient using the FHIR $everything query.

## Prerequisites

You'll need to create a .env file in the project directory to set your `CLIENT_ID` and `CLIENT_SECRET` from your 1upHealth dev account.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all of the dependencies used in the app.

### `yarn dev`

Starts the React app at [http://localhost:3000](http://localhost:3000) and the Node.js server at [http://localhost:5000](http://localhost:5000).
