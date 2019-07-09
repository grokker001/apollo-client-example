import express from 'express'
import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './src/schema'
import resolvers from './src/resolvers'
import cors from 'cors'

const PORT = 4000;

const app = express();
app.use('*', cors({ origin: 'http://localhost:3000'}))


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})