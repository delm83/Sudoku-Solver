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

});

