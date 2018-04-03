const Express = require('express')
const GraphHTTP = require('express-graphql')// express middleware, gets a graphql endpoint spawned quickly
const Schema = require('./schema')

// Config
const APP_PORT = 3000

const app = Express()

app.use('/graphql', GraphHTTP({ // run this middleware at this endpoint
  schema: Schema,
  pretty: true,
  graphiql: true
}))

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`)
})
