const request = require('supertest');
const app = require('../app'); // reference to app.js file

describe('GET /prime', function () {
  it('should respond with 400, when there are no query parameters', function (done) {
    request(app)
      .get('/prime')
      .set('Accept', 'application/json')
      .expect(400, done);
  })

  it('should respond with 400, when a non integer number is set as query param', function (done) {
    request(app)
      .get('/prime?n=3.3')
      .set('Accept', 'application/json')
      .expect(400, done);
  })

  it('should respond with 400, when a negative integer is set as query param', function (done) {
    request(app)
      .get('/prime?n=-10')
      .set('Accept', 'application/json')
      .expect(400, done);
  })

  it('should respond with 400, when query param is not a number', function (done) {
    request(app)
      .get('/prime?n=abc')
      .set('Accept', 'application/json')
      .expect(400, done);
  })

  it('should respond with 200 and correct data, when 3 is set as query param', function (done) {
    request(app)
      .get('/prime?n=3')
      .set('Accept', 'application/json')
      .expect(200, [2], done);
  })

  it('should respond with 200 and empty data, when a 1 is set as query param', function (done) {
    request(app)
      .get('/prime?n=1')
      .set('Accept', 'application/json')
      .expect(200, [], done);
  })

  it('should respond with 200 and two median numbers, when 4 is set as query param', function (done) {
    request(app)
      .get('/prime?n=4')
      .set('Accept', 'application/json')
      .expect(200, [2,3], done);
  })
})
