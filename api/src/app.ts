import createError, { HttpError } from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {z} from 'zod';
const cors = require('cors')
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {ApolloServer} from 'apollo-server';

dotenv.config()

mongoose.connect(`${process.env.MONGODB}`, ()=>{console.log('connecting to Mongo')})
import router from './router/router';


const app = express();
app.use(cors())
//const server = new ApolloServer({typeDefs,resolvers,context})

// app.use(cors({origin:true}))
// app.options("*", cors())
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', router)

export default app;
