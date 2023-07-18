const { expect } = require('chai');
const { getQuestion, updateQuestion, findQuestions, saveQuestion, reportQuestion } = require('../models/questionsModel');

describe('findQuestions', () => {
  it('should find questions for a product', () => {
    const product_id = 1;
    return findQuestions(product_id)
      .then((questions) => {
        expect(questions).to.be.an('array');
        expect(questions[0]).to.have.property('product_id').equal(product_id);
      });
  });
})



describe('updateQuestion', () => {
  it('should increment the helpful score of a question', () => {
    const question_id = 1;

    return getQuestion(question_id)
      .then(question => {
        const oldHelpfulScore = question.helpful;
        return updateQuestion(question_id)
          .then((updatedQuestion => {
            expect(updatedQuestion.helpful).to.equal(oldHelpfulScore + 1);
          }))
      });
  });
});

