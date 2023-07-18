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

describe('GET /qa/questions/:question_id/answers', () => {
  it('should respond with a list of answers for a question', () => {
    const question_id = 1;

    return request(app)
      .get(`/qa/questions/${question_id}/answers`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
      })
  })
})

describe('POST /qa/questions', () => {
  it('should save a question for a product', () => {
    const question = {
      product_id: 1,
      body: 'Test question',
      date_written: 1234,
      asker_name: 'String',
      helpful: 0,
      reported: 0,
      asker_email: 'test@example.com',
      answers: {}
    };

    return request(app)
      .post('/qa/questions')
      .send(question)
      .expect(201)
      .then((res) => {
        expect(res.body).to.have.property('_id');
      })
  })
})

describe('POST /qa/questions/:question_id/answers', () => {
  it('should save an answer for a question', () => {
    const question_id = 1;
    const answer = {
      question_id: 1,
      body: 'Test answer',
      date_written: 1234,
      answerer_name: 'Test name',
      answerer_email: 'test@example.com',
      reported: 0,
      helpful: 0,
      photos: []
    };

    return request(app)
      .post(`/qa/questions/${question_id}/answers`)
      .send(answer)
      .expect(201)
      .then((res) => {
        expect(res.body).to.have.property('_id');
      })
  })
})

describe('PUT /qa/questions/:question_id/helpful', () => {
  it('should mark a question as helpful', () => {
    const question_id = 1;

    return request(app)
      .put(`/qa/questions/${question_id}/helpful`)
      .expect(204);
  })
})

describe('PUT /qa/questions/:question_id/report', () => {
  it('should report a question', () => {
    const question_id = 1;

    return request(app)
      .put(`/qa/questions/${question_id}/report`)
      .expect(204);
  })
})