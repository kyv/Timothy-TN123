process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'woM^Uf9IPagF';

const chai = require('chai');
const request = require('supertest');
const app = require('../index');
const Book = require('../models/book');
const User = require('../models/user');

const expect = chai.expect;

let token;

describe('Book Model Tests', () => {

  before(done => {
    const createUser = User.sync({ force: true }).then(() => User.create({
      username: 'Jane',
      password: 12454,
    }));
    const createBook = Book.sync({ force: true });

    Promise.all([createUser, createBook]).then(() => done());

  });

  after(done => {
    const destroyBook = Book.destroy({
      where: {},
    });
    const destroyUser = User.destroy({
      where: {},
    });

    Promise.all([destroyUser, destroyBook]).then(() => done());
  });

  it('should insert a book', done => {
    Book.create({
      title: 'Parray Hotter',
      description: 'A witch in guineveers court',
    }).then(() => {
      Book.findAll().then(books => {
        expect(books[0].title).to.be.equal('Parray Hotter');
        done();
      });
    });
  });

  describe('Book API Tests', () => {

    before(done => {
      request(app)
        .post('/users/signin')
        .send({ username: 'Jane', password: 12454 })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          token = res.body.data.token;
          done();
        });
    });

    it('should require authorization', done => {

      request(app)
        .get('/book')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.be.equal(401);
          done();
        });
    });

    it('should retrieve books from API', done => {

      request(app)
        .get('/book')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data[0].title).to.be.equal('Parray Hotter');
          done();
        });
    });
  });
});
