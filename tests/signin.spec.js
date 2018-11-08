process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'woM^Uf9IPagF';

const chai = require('chai');
const request = require('supertest');
const app = require('../index');
const User = require('../models/user');
const Institution = require('../models/institution');

const expect = chai.expect;

describe('User Model Tests', () => {

  before(done => {
    const createInstitutionA = Institution.sync({ force: true }).then(() => Institution.create({
      name: 'Node Group',
      url: 'https://node.org',
      domain: 'node.org',
    }));
    const createUser = User.sync({ force: true }).then(() => User.create({
      username: 'Jane',
      email: 'jane@node.org',
      password: 12454,
      role: 'student',
    }).then(user => {
      user.setInstitution('node.org');
    }));

    Promise.all([
      createInstitutionA,
      createUser,
    ]).then(() => done());

  });

  after(done => {
    Promise.all([
      User.drop(),
      Institution.drop(),
    ]).then(() => done());

  });

  describe('Signin API Tests', () => {

    it('should not authenticate wrong password', done => {
      request(app)
        .post('/users/signin')
        .send({ username: 'Jane', password: 12254 })
        .expect(401)
        .end(err => {
          if (err) {
            done(err);
          }
          done();
        });
    });


    it('should authenticate correct password', done => {
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
