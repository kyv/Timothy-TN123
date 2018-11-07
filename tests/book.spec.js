process.env.NODE_ENV = 'test';

const chai = require('chai');
const request = require('supertest');
const app = require('../index');
const Book = require('../models/book');

const expect = chai.expect;

describe('Book Model Tests', () => {

  before(done => {
    Book.sync({ force: true }).then(() => done());
  });

  after(done => {
    Book.destroy({
      where: {},
    }).then(done());
  });

  it('should insert a book', done => {
    Book.create({
      title: 'Parray Hotter',
      description: 'A witch in guineveers court',
    }).then(() => done());
  });

  it('should find a book', done => {
    Book.findAll().then(books => {
      expect(books[0].title).to.be.equal('Parray Hotter');
      done();
    });
  });

  describe('Book API Tests', () => {

    it('should have a body', done => {
      request(app)
        .get('/book')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.status).to.be.equal('success');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
});
