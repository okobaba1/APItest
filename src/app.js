import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import Router from './routes'

dotenv.config();
const app = express();

const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.get('/', (_req, res) => res.status(301).redirect('/api'));
app.use('/api', Router);



app.use('*', (req, res) => res.status(404).json({
    status: 'Error',
    error: 'Sorry!!, the page you are looking for cannot be found',
}));

app.set('port', port);
app.listen(port, console.log(`listening to port ${port}`));
export default app;