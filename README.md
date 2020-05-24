# APItest
Ice and Fire is a detailed app for books written from the popular HBO series Game of Thrones


## Features

### Required Features

- User can view all/specific book from an external API
        `GET http://localhost:8080/api/external-books?name=:nameOfABook`
        `GET http://localhost:8080/api/external-books`

- User can create a book in a local database
        `POST http://localhost:8080/api/v1/books`

- User can view all books in the database
        `GET http://localhost:8080/api/v1/books`

- User can update a specific book with one or more data
        `PATCH http://localhost:8080/api/v1/books/:id`

- User can delete a book from the database
        `DELETE http://localhost:8080/api/v1/books/:id`

- User can view a specific from the database
        `GET http://localhost:8080/api/v1/books/:id`



#### Tools

##### Dev Tools

- [Es6+ Javascript](https://www.ecma-international.org/ecma-262/9.0/index.html)
- [Node/Express](https://nodejs.org/en/)
- [NPM](npmjs.com)
- [PostgreSQL](https://www.postgresql.org/)


##### Testing Framework

- Mocha
- Chai
- Chai-HTTP



#### API Docs

- [Ice and Fire API](https://www.anapioficeandfire.com/api/books)

#### Getting Started

To setup Ice and Fire, These tools should be installed in your PC

- [Node js](https://nodejs.org/en/download/)
- [Postgressql](https://www.postgresql.org/download/)
- [Postman](https://www.getpostman.com/downloads/)
- [Git](https://git-scm.com/downloads)


#### Installing

- Clone the repo using `git clone https://github.com/okobaba1/APItest.git`
- Create a folder on your machine to house **_Ice and Fire_** on your machine
- Open the directory
- create a .env file with values for
    DB_USER=postgres
    DB_NAME=ice (*Also create a database called ice*)
    DB_PASSWORD= (*your postgres user password*)
    DB_PORT=5432
    DB_TEST=testdb



* Open terminal
* Run `npm install`
- Run ``` npm run db:migrate ``` to migrate database

### Running the app

- Run `npm run start`

### Running the tests

- Run `npm run test`

### License

This project is authored by [Blessing Makaraba](https://github.com/abobos) and is licensed to use under the MIT License - see the [License](https://github.com/Abobos/Property-Pro-Lite/blob/develop/LICENSE) file for details
