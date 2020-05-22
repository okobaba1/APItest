import express from 'express';
import Books from '../controllers/books';

const Router = express.Router();

Router.get('/', (req, res) => res.status(301).redirect('api/v1'));
Router.get('/v1', (req, res) => res.status(200).json({
    message: 'WELCOME TO ICE and FIRE',
    books: 'https://www.anapioficeandfire.com/api/books',
}));


Router.get('/external-books', Books.external);

export default Router;