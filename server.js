require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const got = require("got");

const app = express();
const port = process.env.PORT || 5000;

const rootUrl = "https://api.1up.health";
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// generate access code based on user id
app.post("/api/codes/:uid", async (req, res) => {
  const options = {
    pathname: "/user-management/v1/user/auth-code",
    searchParams: {
      app_user_id: req.params.uid,
      client_id: clientId,
      client_secret: clientSecret,
    },
    method: "POST",
  };

  const response = await got(rootUrl, options);

  console.log(response.body);
  res.send(response.body);
});

// generate access token based on code
app.post("/api/tokens/:code", async (req, res) => {
  const options = {
    pathname: "/fhir/oauth2/token",
    searchParams: {
      client_id: clientId,
      client_secret: clientSecret,
      code: req.params.code,
      grant_type: "authorization_code",
    },
    method: "POST",
  };

  const response = await got(rootUrl, options);

  console.log(response.body);
  res.send(response.body);
});

// get patient id for access token
app.get("/api/patients", async (req, res) => {
  const options = {
    pathname: "/fhir/dstu2/Patient",
    headers: {
      Authorization: req.headers.authorization,
    },
  };

  const response = await got(rootUrl, options);

  res.send(response.body);
});

// get everything for patient id
app.get("/api/patients/:id", async (req, res) => {
  const options = {
    pathname: `/fhir/dstu2/Patient/${req.params.id}/$everything`,
    headers: {
      Authorization: req.headers.authorization,
    },
  };

  const response = await got(rootUrl, options);

  res.send(response.body);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
