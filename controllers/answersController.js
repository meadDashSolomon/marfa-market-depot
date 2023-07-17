const { findAnswers, saveAnswer } = require('../models/answersModel');

exports.fetchAnswers = (question_id, res) => {
  return findAnswers(question_id)
    .then((answers) => {
      console.log("ANSWERSCONTROLLER SUCCESSFULLY FETCHED ANSWERS:::::", answers);
      res.status(200).json(answers);
      return answers;
    })
    .catch((err) => {
      console.log("ANSWERSCONTROLLER ERROR FETCHING ANSWERS:::::", err);
      return res.sendStatus(400);
    })
}

exports.addAnswer = (question_id, answer, res) => {
  return saveAnswer(question_id, answer)
    .then((savedAnswer) => {
      console.log("ANSWERSCONTROLLER SUCCESSFULLY SAVED ANSWER:::::", savedAnswer);
      res.status(201).json(savedAnswer);
      return saveAnswer;
    })
    .catch((err) => {
      console.log("ANSWERSCONTROLLER ERROR SAVING ANSWER:::::", err);
      return res.sendStatus(400);
    })
}