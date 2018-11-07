process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'woM^Uf9IPagF';

const chai = require('chai');
const request = require('supertest');
const app = require('../index');
const User = require('../models/user');
const nresolve = require('../lib/dns');

const expect = chai.expect;

describe('User Unit Tests', () => {

  it('should resolve domain', done => {
    const tld = 'node.org';

    nresolve(tld).then(result => {
      expect(result.length).to.be.gt(0);
      done();
    });

  });
});


describe('Create User API Tests', () => {

  before(done => {
    User.sync().then(done());
  });

  after(done => {
    User.drop().then(done());
  });

  it('should create a  user', done => {

    request(app)
      .post('/users/create')
      .send({
        username: 'Will',
        email: 'will@node.org',
        password: 934344,
        role: 'student',
      })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const email = res.body.data.email;

        expect(email).to.be.equal('will@node.org');
        done();
      });
  });
});