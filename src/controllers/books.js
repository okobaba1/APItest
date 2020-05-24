import axios from 'axios';
import db from '../database/dbconnection';

const apiUrl = 'https://www.anapioficeandfire.com/api/books';

const Books = {
    async external(req, res) {
        try {
            const {data} = await axios.get(apiUrl);
            const { name } = req.query;
            const newData = data.map(({name, isbn, authors, numberOfPages:number_of_pages, publisher, country, released:release_date}) => {
                return {name, isbn, authors, number_of_pages, publisher, country, release_date}
            })
            if (!name) {
                return res.status(200).json({
                    status_code: 200,
                    status: 'success',
                    data: newData,
                });
            } 
            if (name){
                const nameData = newData.find(({name:itemName}) => itemName === name);
                if (nameData) {
                    return res.status(200).json({
                        status_code: 200,
                        status: 'success',
                        data: nameData,
                    });
                } return res.status(200).json({
                    status_code: 200,
                    status: 'success',
                    data: [],
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: (error.message),
            });
        }
        
    },

    async createBook(req, res) {
        try {
            const {
                name, isbn, authors, country, number_of_pages, publisher, release_date,
            } = req.body;
            const checkBook = {
                text: 'SELECT * FROM books where name = $1 AND isbn = $2 AND authors = $3 AND country = $4 AND number_of_pages = $5 AND publisher = $6 AND release_date = $7',
                values: [name, isbn, authors, country, number_of_pages, publisher, release_date],
            };
            const { rows } = await db.query(checkBook)
            if (rows[0]) {
                return res.status(409).json({
                    status: 'error',
                    message: 'Book already created',
                });
            }
            const createQuery = {
                text: 'INSERT INTO books(name, isbn, authors, country, number_of_pages, publisher, release_date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                values: [name, isbn, authors, country, number_of_pages, publisher, release_date],
            };
            const { rows: postBook } = await db.query(createQuery)
            return res.status(201).json({
                status_code: 201,
                status: 'success',
                data: postBook,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: (error.message),
            });
        }
    },

    async getAllbooks(req, res) {
        try {
            const getBooks = {
                text: 'SELECT * FROM books'
            };
            const { rows } = await db.query(getBooks);
            if (!rows[0]){
                return res.status(200).json({
                    status_code: 200,
                    status: 'success',
                    data: [],
                });
            } 
            return res.status(200).json({
                status_code: 200,
                status: 'success',
                data: rows,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: (error.message),
            });
        }
    },

    async updateBook(req, res) {
        try {
            const { id } = req.params;
            const checkBook = {
                text: 'SELECT * FROM books where id = $1',
                values: [id],
            };
            const { rows } = await db.query(checkBook);
              if (!rows[0]) {
                return res.status(404).json({
                  status: 'error',
                  error: 'No book found',
                });
              }
            let newObj = {};
            Object.keys(req.body).filter(( item ) => req.body[item] && req.body[item].trim().length > 0)
                        .forEach((item2)=> {newObj[item2] = req.body[item2]});
            
            console.log(newObj);
            Object.keys(newObj)[0]
            const keys = Object.keys(newObj);
            const value = Object.values(newObj);

            console.log(keys[0])
            if (keys[0]){
                const updateBook = {
                    text: `UPDATE books SET ${keys[0]} = $1 WHERE id = ${id} RETURNING *`,
                    values: [value[0]],
                };
                const { rows: update } = await db.query(updateBook);
                
                return res.status(200).json({
                    status_code: 200,
                    status: 'success',
                    message: `The book ${update[0].name} was updated successfully`,
                    data: update,
                });

            } 
            return res.status(400).json({
                status: 'error',
                error: 'No input',
            });

        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: (error.message),
            });
        }
    }
}

export default Books;