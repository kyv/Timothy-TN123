process.env.NODE_ENV = 'test';

const chai = require('chai');
const request = require('supertest');
const app = require('../index');
const User = require('../models/user');

const expect = chai.expect;

describe('User Model Tests', () => {

  before(done => {
    User.sync({ force: true }).then(() => {
      User.create({
        username: 'Jane',
        password: 12454,
        email: 'jane@node.org',
      }).then(() => done());
    });
  });

  after(done => {
    User.destroy({
      where: {},
    }).then(done());
  });

  it('should find a user', done => {
    User.findAll().then(users => {
      expect(users[0].username).to.be.equal('Jane');
      done();
    });
  });

  describe('Signin API Tests', () => {

    it('should have a body', done => {
      request(app)
        .post('/users/signin')
        .send({ username: 'Jane', password: 12454 })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data.id).to.be.equal(1);
          expect(res.body.data.username).to.be.equal('Jane');
          done();
        });
    });
  });
});
