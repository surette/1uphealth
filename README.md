# Getting Started with 1upHealth Dashboard

The 1upHealth Dashboard app takes you through a workflow to retrieve a patient's medical data beginning with a 1upHealth user ID. After entering a user ID, the app will generate an access token which will be passed along with all subsequent API calls. You'll then be given a "Connect to Cerner" link to log in to the Cerner health system and approve access to medical data. For testing purposes, you can use `wilmasmart` / `Cerner01` to log into Cerner.

After approving access, return to the dashboard and press the "Get patient" button to retrieve the name of the test patient in the Cerner system.
Then, you'll be prompted with a button to get all data for that patient using the FHIR $everything query.

## Prerequisites

You'll need to create a developer account at [1up.health](https://1up.health), then create a `.env` file in the root project directory to set your `CLIENT_ID` and `CLIENT_SECRET`.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all of the dependencies used in the app. You should also run `npm install` from the client directory to install dependencies for the front-end.

### `npm run dev`

Starts the React app at [http://localhost:3000](http://localhost:3000) and the Node.js server at [http://localhost:8000](http://localhost:8000).
