import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Dotenv
import * as dotenv from 'dotenv';
dotenv.config();

// Database
import connect from './config/connect';
import { db } from './config/db';
connect(db);

const router = express.Router();

// routes
import auth from './routes/auth';

const app: Application = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Access-Token,Accept,Authorization,Origin,Accept,X-Requested-With,Content-Type')
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next()
})
// routes
app.use('/v1/auth', auth);

// server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
