const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /qa/questions', () => {
  it('should respond with a list of questions for a product', () => {
    const product_id = 1;

    return request(app)
      .get(`/qa/questions?product_id=${product_id}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
      })
      .catch((err) => {
        console.error(err);
      })
  })
})