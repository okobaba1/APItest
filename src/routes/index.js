import express from 'express';
import Books from '../controllers/books';
import valid from '../middleware/valid';


const { validator, validationHandler } = valid;

const Router = express.Router();

Router.get('/', (req, res) => res.status(301).redirect('api/v1'));
Router.get('/v1', (req, res) => res.status(200).json({
    message: 'WELCOME TO ICE and FIRE',
    books: 'https://www.anapioficeandfire.com/api/books',
}));


Router.get('/external-books', Books.external);
Router.post('/v1/books', validator, validationHandler, Books.createBook);
Router.get('/v1/books', Books.getAllbooks);
Router.patch('/v1/books/:id', Books.updateBook);

export default Router;