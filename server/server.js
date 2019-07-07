import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './src/schema'
import resolvers from './src/resolvers'
import { makeExecutableSchema } from 'apollo-server-express'
import cors from 'cors'

const PORT = 4000;

const app = express();
app.use('*', cors({ origin: 'http://localhost:3000'}))


const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    playground: true
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen(PORT, () => {
    console.log(`Start server at port: ${PORT}`)
})