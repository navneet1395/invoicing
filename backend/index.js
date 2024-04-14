
import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import passport from "passport";
import session from "express-session";
import ConnectMongo from "connect-mongodb-session";
import{buildContext} from "graphql-passport"
import {configurePassport} from "./passport/passport.config.js"
dotenv.config();
configurePassport();
const app = express();
const httpServer = http.createServer(app);
const MongoStore = ConnectMongo(session);
const store = new MongoStore({
  uri:process.env.MONGO_URI,
  collection:"sessions"
})
store.on("error",(error)=>{
  console.log(error)
})
app.use(session({
  secret:process.env.SECRET_KEY,
  resave:false,
  saveUninitialized:false,
  store:store,
  cookie:{
    maxAge :1000*60*30*24,
    secure:true,
    httpOnly:true
  }
}))
app.use(passport.initialize())
app.use(passport.session())
const server = new ApolloServer({
  typeDefs :mergedTypeDefs,
  resolvers:mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors({
    origin:"http://localhost:3000",
    credentials:true
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req ,res}) => buildContext({ req }),
  }),
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB()
console.log(`🚀 Server ready at http://localhost:4000/`);