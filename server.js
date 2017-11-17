'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Import our schema to use
const schema = require('./schema');

// The root provides a resolver function for each API endpoint
// let root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

let port = 3000;
let app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/`);