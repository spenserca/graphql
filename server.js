'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = require('./schema');

const port = 9000;
let app = express();

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true,
  pretty: true
}));
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/`);