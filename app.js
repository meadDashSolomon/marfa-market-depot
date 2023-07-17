const express = require('express');
const { fetchQuestions, addQuestion } = require('./controllers/questionsController');
const { fetchAnswers, addAnswer } = require('./controllers/answersController');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


// GET REQUESTS

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



// POST REQUESTS

// middleware that parses request bodies so that I can access request body with req.body
app.use(express.json());
// Saves question for a particular product
app.post('/qa/questions', (req, res) => {
  const question = req.body;
  addQuestion(question, res)
    .then((savedQuestion) => {
      console.log("APP.JS SUCCESSFULLY SAVED QUESTION:::::", savedQuestion)
    })
    .catch((err) => {
      console.log("APP.JS - ERROR SAVING QUESTION:::::", err);
    })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  const question_id = req.params.question_id;
  const answer = req.body;
  addAnswer(question_id, answer, res)
    .then((savedAnswer) => {
      console.log("APP.JS SUCCESSFULLY SAVED ANSWER::::", savedAnswer)
    })
    .catch((err) => {
      console.log("APP.JS ERROR SAVING ANSWER:::::", err);
    })
})