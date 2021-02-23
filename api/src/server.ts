import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { log } from 'debug';

import './database';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(router)

app.listen(3333, log('Server listem port 3333'));
