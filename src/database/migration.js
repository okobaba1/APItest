import '@babel/polyfill';
import db from './dbconnection';

const Migration = {
  async migrate() {
    try {
      console.log('Dropping books table');
      await db.query('DROP TABLE IF EXISTS books CASCADE');

      console.log('Creating books table');
      await db.query(`
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
    `);

      const adminQuery = `INSERT INTO
    books(name, isbn, authors, country, number_of_pages, publisher, release_date)
    VALUES($1,$2,$3,$4,$5,$6,$7)
    RETURNING name, isbn, authors, country, number_of_pages, publisher, release_date`;
      const values = [
        'A cry for help',
        '999-233847',
        'Anu Goat',
        'Nigeria',
        584,
        'John pub',
        '2019-08-01',
      ];

      
      console.log('Creating Admin');
      await db.query(adminQuery, values);
      console.log('Admin book Created');
    } catch (error) {
      console.log(error);
    }
  },
};

export default Migration;

Migration.migrate();