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
      puzzle: puzzlesAndSolutions[2][0]
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'solution', 'returned object should contain solution');
      assert.equal(res.body.solution, puzzlesAndSolutions[2][1]);
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

  test('Test POST /api/check a puzzle placement with all fields', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({
      puzzle: puzzlesAndSolutions[2][0],
      coordinate: 'b3',
      value: '3'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'valid', 'returned object should contain valid');
      assert.isTrue(res.body.valid);
      done();
    });
  });

  test('Test POST /api/check a puzzle placement with single placement conflict', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({
      puzzle: puzzlesAndSolutions[4][0],
      coordinate: 'a4',
      value: '2'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'valid', 'returned object should contain valid');
      assert.property(res.body, 'conflict', 'returned object should contain conflict');
      assert.isNotTrue(res.body.valid);
      assert.isArray(res.body.conflict)
      assert.include(res.body.conflict, 'row');
      assert.notInclude(res.body.conflict, 'column');
      assert.notInclude(res.body.conflict, 'region');
      done();
    });
  });

  test('Test POST /api/check a puzzle placement with 2 placement conflicts', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({
      puzzle: puzzlesAndSolutions[2][0],
      coordinate: 'd1',
      value: '4'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'valid', 'returned object should contain valid');
      assert.property(res.body, 'conflict', 'returned object should contain conflict');
      assert.isNotTrue(res.body.valid);
      assert.isArray(res.body.conflict)
      assert.include(res.body.conflict, 'row');
      assert.include(res.body.conflict, 'column');
      assert.notInclude(res.body.conflict, 'region');
      done();
    });
  });

  test('Test POST /api/check a puzzle placement with all placement conflicts', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({
      puzzle: puzzlesAndSolutions[3][0],
      coordinate: 'b1',
      value: '5'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'valid', 'returned object should contain valid');
      assert.property(res.body, 'conflict', 'returned object should contain conflict');
      assert.isNotTrue(res.body.valid);
      assert.isArray(res.body.conflict)
      assert.include(res.body.conflict, 'row');
      assert.include(res.body.conflict, 'column');
      assert.include(res.body.conflict, 'region');
      done();
    });
  });

  test('Test POST /api/check a puzzle placement with missing required fields', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({
      puzzle: puzzlesAndSolutions[3][0],
      coordinate: '',
      value: ''
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'error', 'returned object should contain error');
      assert.equal(res.body.error, 'Required field(s) missing');
      done();
    });
  });

  test('Test POST /api/check a puzzle placement with invalid characters', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5...n.9..1....8.2.3674.3.7.2..9.47.&.8..1..16....926914.37.',
      coordinate: 'c3',
      value: '8'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'error', 'returned object should contain error');
      assert.equal(res.body.error, 'Invalid characters in puzzle');
      done();
    });
  });

  test('Test POST /api/check a puzzle placement with incorrect length', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37..',
      coordinate: 'e1',
      value: '6'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'error', 'returned object should contain error');
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
      done();
    });
  });

  test('Test POST /api/check a puzzle placement with invalid coordinate', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({
      puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
      coordinate: 'j4',
      value: '2'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'error', 'returned object should contain error');
      assert.equal(res.body.error, 'Invalid coordinate');
      done();
    });
  });

  test('Test POST /api/check a puzzle placement with invalid value', function(done) {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({
      puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
      coordinate: 'b4',
      value: '0'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isObject(res.body, 'response should be an object');
      assert.property(res.body, 'error', 'returned object should contain error');
      assert.equal(res.body.error, 'Invalid value');
      done();
    });
  });

});

