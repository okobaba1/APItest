import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

const {
  expect, assert, should,
} = chai;
chai.use(chaiHttp);
dotenv.config();
should();

describe('Book', () => {

    it('App should exists', () => {
        chai.request(app);
        expect(app).to.be.a('function');
    });

    it('Get all api books', (done) => {
        chai.request(app)
          .get('/api/external-books')
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body).be.an('object');
            expect(res.body.status).be.a('string');
            expect(res.body.status_code).be.a('number');
            assert.equal(res.body.status, 'success');
            done();
        });
    });
    it('Get one specific api books', (done) => {
        chai.request(app)
          .get('/api/external-books')
          .query({ name: 'A Clash of Kings' })
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body).be.an('object');
            expect(res.body.status).be.a('string');
            expect(res.body.status_code).be.a('number');
            assert.equal(res.body.status, 'success');
            assert.equal(res.body.data.name, 'A Clash of Kings');
            expect(res.body.data).be.an('object');
            done();
        });
    });
    
    it('incorrect book name', (done) => {
        chai.request(app)
          .get('/api/external-books')
          .query({ name: 'A Clash Kings' })
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body).be.an('object');
            expect(res.body.status).be.a('string');
            expect(res.body.status_code).be.a('number');
            assert.equal(res.body.status, 'success');
            expect(res.body.data).be.an('array');
            done();
        });
    });

    it('create book', (done) => {
        const book = {
          name: 'Okobaba Victor',
          country: 'Portugal',
          isbn: 849959504-2,
          release_date: '2019-07-24',
          number_of_pages: 26000,
          authors: 'luke madu',
          publisher: 'Idiot photo'
        };
        chai.request(app)
          .post('/api/v1/books')
          .send(book)
          .end((err, res) => {
            res.should.have.status(201);
            expect(res.body).be.an('object');
            expect(res.body.status).be.a('string');
            assert.equal(res.body.status, 'success');
            done();
        });
    });

    it('create books', (done) => {
      const book = {
        name: 'Okobaba Victor',
        country: 'Portugal',
        isbn: 84995-2,
        release_date: '2019-07-24',
        number_of_pages: 26000,
        authors: 'luke madu',
        publisher: 'Idiot photo'
      };
      chai.request(app)
        .post('/api/v1/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          assert.equal(res.body.status, 'success');
          done();
      });
    });

    it('create books', (done) => {
      const book = {
        name: 'Okobaba Victor',
        country: 'Portugal',
        isbn: 849988676205-2,
        release_date: '2019-07-24',
        number_of_pages: 26000,
        authors: 'luke madu',
        publisher: 'Idiot photo'
      };
      chai.request(app)
        .post('/api/v1/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          assert.equal(res.body.status, 'success');
          done();
      });
    });


    it('Already Created books', (done) => {
        const book = {
          name: 'Okobaba Victor',
          country: 'Portugal',
          isbn: 849959504-2,
          release_date: '2019-07-24',
          number_of_pages: 26000,
          authors: 'luke madu',
          publisher: 'Idiot photo'
        };
        chai.request(app)
          .post('/api/v1/books')
          .send(book)
          .end((err, res) => {
            res.should.have.status(409);
            expect(res.body).be.an('object');
            expect(res.body.message).be.a('string');
            assert.equal(res.body.status, 'error');
            done();
          });
      });
      it('Get all db books', (done) => {
        chai.request(app)
          .get('/api/v1/books')
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body).be.an('object');
            expect(res.body.status).be.a('string');
            expect(res.body.status_code).be.a('number');
            assert.equal(res.body.status, 'success');
            done();
        });
    });

    it('Patch book detail', (done) => {
      const detail = {
        name: 'Oko Vic',
      };
      chai.request(app)
        .patch('/api/v1/books/2')
        .send(detail)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          expect(res.body.status_code).be.a('number');
          assert.equal(res.body.status, 'success');
          done();
      });
    });


    it('No book found', (done) => {
      const detail = {
        name: 'Oko Vic',
      };
      chai.request(app)
        .patch('/api/v1/books/98')
        .send(detail)
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          assert.equal(res.body.status, 'error');
          done();
      });
    });

    it('No input', (done) => {
      chai.request(app)
        .patch('/api/v1/books/1')
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          assert.equal(res.body.status, 'error');
          done();
      });
    });

    it('No book found', (done) => {
      chai.request(app)
        .delete('/api/v1/books/98')
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          assert.equal(res.body.status, 'error');
          done();
      });
    });


    
    it('Delete book', (done) => {
      chai.request(app)
        .delete('/api/v1/books/2')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          assert.equal(res.body.status, 'success');
          done();
      });
    });
    
    it('No book found', (done) => {
      chai.request(app)
        .get('/api/v1/books/98')
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          assert.equal(res.body.status, 'error');
          done();
      });
    });

    it('Get a specific book', (done) => {
      chai.request(app)
        .get('/api/v1/books/1')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          expect(res.body.status_code).be.a('number');
          assert.equal(res.body.status, 'success');
          done();
      });
    });

    it('wrong address', (done) => {
      chai.request(app)
        .get('/apiv1/books/1')
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          assert.equal(res.body.status, 'Error');
          done();
      });
    });

    it('create book with string number', (done) => {
      const book = {
        name: 'Okobaba Victor',
        country: 'Portugal',
        isbn: 849959504-2,
        release_date: '2019-07-24',
        number_of_pages: 'lol',
        authors: 'luke madu',
        publisher: 'Idiot photo'
      };
      chai.request(app)
        .post('/api/v1/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body).be.an('object');
          expect(res.body.status).be.a('string');
          assert.equal(res.body.status, 'error');
          done();
      });
  });



});