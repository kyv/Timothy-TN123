process.env.NODE_ENV = 'test';

const app = require('../index');
const request = require('supertest');

describe('Index API Tests', () => {

  it('should have a status of 200', done => {
    request(app)
      .get('/')
      .expect(200)
      .end(err => {
        if (err) {
          done(err);
        }
        done();
      });
  });
});
