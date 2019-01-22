const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

require("dotenv").config();

// JWT Validation
const checkjwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing key is provided by the JWKS endpoint

  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/well-known/jwks.json`
  }),

  // validate the audience and the issuer
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`,

  // algorithm
  algorithms: ["RS256"]
});

const app = express();

app.get("/public", (req, res) => {
  res.json({
    message: "Hello From A Public API"
  });
});

app.get("/private", checkjwt, (req, res) => {
  res.json({
    message: "Hello From A Private API"
  });
});

app.listen(3001, () => console.log("Server is responding at 3001"));
