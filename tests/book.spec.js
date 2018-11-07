process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'woM^Uf9IPagF';

const chai = require('chai');
const request = require('supertest');
const app = require('../index');
const Book = require('../models/book');
const User = require('../models/user');
const Institution = require('../models/institution');

const expect = chai.expect;

let token;

describe('Book Model Tests', () => {

  before(done => {
    const createInstitutionA = Institution.sync({ force: true }).then(() => Institution.create({
      name: 'Node Group',
      url: 'https://node.org',
      domain: 'node.org',
    }));
    const createInstitutionB = Institution.sync({ force: true }).then(() => Institution.create({
      name: 'Fake Group',
      url: 'https://fake.com',
      domain: 'fake.com',
    }));
    const createUser = User.sync({ force: true }).then(() => User.create({
      username: 'Jane',
      email: 'jane@node.org',
      password: 12454,
      role: 'student',
    }).then(user => {
      user.setInstitution('node.org');
      // console.log(user);
    }));
    const createBook = Book.sync({ force: true });

    Promise.all([
      createInstitutionA,
      createInstitutionB,
      createUser,
      createBook,
    ]).then(() => done());
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
    const createA = Book.create({
      title: 'Parray Hopeer',
      author: 'Chance Leguem',
      ISBN: '098766',
    }).then(book => book.setInstitution('node.org'));

    const createB = Book.create({
      title: 'Life and Times',
      author: 'Hillary Jay',
      ISBN: '2854780',
    }).then(book => book.setInstitution('fake.com'));

    Promise.all([createA, createB]).then(() => {
      Book.findAll().then(books => {
        expect(books[0].title).to.be.equal('Parray Hopeer');
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

    it('should retrieve related books from API', done => {

      request(app)
        .get('/book')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data.length).to.be.equal(1);
          expect(res.body.data[0].title).to.be.equal('Parray Hopeer');
          done();
        });
    });
  });
});
