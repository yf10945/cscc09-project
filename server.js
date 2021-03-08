const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// temp schema 
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

app.listen(port, () => console.log(`Listening on port ${port}`));