const { findAnswers } = require('../models/answersModel');

exports.fetchAnswers = (question_id, res) => {
  return findAnswers(question_id)
    .then((answers) => {
      console.log("ANSWERSCONTROLLER SUCCESSFULLY FETCHED ANSWERS:::::", answers);
      res.json(answers);
      return answers;
    })
    .catch((err) => {
      console.log("ANSWERSCONTROLLER ERROR FETCHING ANSWERS:::::", err);
      return res.sendStatus(400);
    })
}