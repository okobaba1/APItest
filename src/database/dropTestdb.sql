DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
\c testdb;

  CREATE TABLE IF NOT EXISTS books(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(128) NOT NULL,
    isbn VARCHAR(255) UNIQUE NOT NULL,
    authors VARCHAR(128) NOT NULL,
    number_of_pages INTEGER NOT NULL,
    publisher VARCHAR(128) NOT NULL,
    country VARCHAR(128) NOT NULL,
    release_date DATE NOT NULL
  );
