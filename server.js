const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");
// JWT Validation
const checkjwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing key is provided by the JWKS endpoint

  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://azax25547-dev.auth0.com/.well-known/jwks.json"
  }),

  // validate the audience and the issuer
  audience: "http://localhost:3001",
  issuer: "https://azax25547-dev.auth0.com/",

  // algorithm
  algorithms: ["RS256"]
});

const app = express();

app.get("/public", (req, res) => {
  res.json({
    message: "Hello From A Public API"
  });
});
app.use(checkjwt);
app.get("/private", (req, res) => {
  res.json({
    message: "Hello From A Private API"
  });
});
app.get("/courses", checkjwt, checkScope(["read:courses"]), (req, res) => {
  res.json({
    courses: [
      { id: 1, title: "Building Apps With REact" },
      { id: 2, title: "Building app with nodejs" }
    ]
  });
});
app.listen(3001, () => console.log("Server is responding at 3001"));
