const express = require('express');
const { fetchQuestions } = require('./controllers/questionsController');
const { fetchAnswers } = require('./controllers/answersController');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Retrieves a list of questions for a particular product
app.get('/qa/questions', (req, res) => {
  const product_id = req.query.product_id;
  fetchQuestions(product_id, res)
    .then((questions) => {
      console.log("APP.JS SUCCESSFULLY FETCHED QUESTIONS:::::", questions)
    })
    .catch((err) => {
      console.log("APP.JS - ERROR FETCHING QUESTIONS:::::", err);
    })
})

// Returns answers for a given question
app.get('/qa/questions/:question_id/answers', (req, res) => {
  const question_id = req.params.question_id;
  fetchAnswers(question_id, res)
    .then((answers) => {
      console.log("APP.JS SUCCESSFULLY FETCHED ANSWERS:::::", answers)
    })
    .catch((err) => {
      console.log("APP.JS ERROR FETCHING QUESTIONS:::::", err)
    })
})