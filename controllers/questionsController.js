const { findQuestions } = require('../models/questionsModel');

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