const { expect } = require('chai');
const { getQuestion, updateQuestion } = require('../models/questionsModel');

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