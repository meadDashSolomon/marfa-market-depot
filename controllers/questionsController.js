const { findQuestions, saveQuestion, updateQuestion } = require('../models/questionsModel');

exports.fetchQuestions = (product_id, res) => {
  return findQuestions(product_id)
    .then((questions) => {
      console.log("QUESTIONCONTROLLER.js SUCESSFULLY FETCHED QUESTIONS::::::", questions);
      res.send(questions);
      return questions;
    })
    .catch((err) => {
      console.log("QUESTIONCONTROLLER.js ERROR FETCHING QUESTIONS:::::", err);
      return res.sendStatus(400);
    })
}

exports.addQuestion = (question, res) => {
  return saveQuestion(question)
    .then((savedQuestion) => {
      console.log("QUESTIONCONTROLLER.JS SUCCESSFULLY SAVED QUESTION:::::", savedQuestion);
      res.send(savedQuestion);
      return savedQuestion;
    })
    .catch((err) => {
      console.log("QUESTIONCONTROLLER.JS ERROR SAVING QUESTION:::::", savedQuestion);
      return res.sendStatus(400);
    })
}

exports.markQuestionHelpful = (question_id, res) => {
  return updateQuestion(question_id)
    .then((updatedQuestion) => {
      console.log("QUESTIONCONTROLLER.JS SUCCESSFULLY UPDATED QUESTION", updatedQuestion)
      res.send(updatedQuestion);
      return updatedQuestion;
    })
    .catch((err) => {
      console.log("QUESTIONCONTROLLER.JS ERROR UPDATING QUESITON", err);
      return res.sendStatus(400);
    })
}