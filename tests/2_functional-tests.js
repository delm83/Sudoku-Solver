const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");

chai.use(chaiHttp);

suite('Functional Tests', () => {
    
    test('Test POST /api/solve with valid puzzle string', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/solve')
    .send({
      puzzle: puzzlesAndSolutions[1][0]
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'solution', 'returned object should contain solution');
      assert.equal(res.body.solution, puzzlesAndSolutions[1][1]);
      done();
    });
  });

  test('Test POST /api/solve with missing puzzle string', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/solve')
    .send({
      puzzle: ''
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'error', 'returned object should contain error');
      assert.equal(res.body.error, 'Required field missing');
      done();
    });
  });
  test('Test POST /api/solve with invalid characters', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/solve')
    .send({
      puzzle: '..839.7.575.....964..1....!..16.29846.9.312.7..754.....62..5.78.8.*.3.2...492...1'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'error', 'returned object should contain error');
      assert.equal(res.body.error, 'Invalid characters in puzzle');
      done();
    });
  });
  test('Test POST /api/solve with incorrect length', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/solve')
    .send({
      puzzle: '..839.7.575.....964..1......16.29846.9.312.7..754.....62..5.78.8..3.2...492...1'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'error', 'returned object should contain error');
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
      done();
    });
  });

  test('Test POST /api/solve a puzzle that cannot be solved', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/solve')
    .send({
      puzzle: '.7.89.....5....3.4.2..44.1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'error', 'returned object should contain error');
      assert.equal(res.body.error, 'Puzzle cannot be solved');
      done();
    });
  });

});

