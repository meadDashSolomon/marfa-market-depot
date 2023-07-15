const express = require('express');
const router = express.Router();
const fetchQuestions = require('../controllers/questionsController')

// GET, POST /qa/questions
// router
//   .route('/qa/questions')
//   .get((req, res) => {
//     fetchQuestions()
//    })
//    .post('/', (req, res) => {

//    })

// // / GET, POST /:question_id/answers
// router
//   .route('/:question_id/answers')
//   .get('/:question_id/answers', (req, res) => {

//   })
//   .post('/:question_id/answers', (req, res) => {

//   });

// // PUT /qa/questions/:question_id/helpful
// router.put('/:question_id/helpful', (req, res) => {

// })

// // PUT /qa/questions/:question_id/report
// router.put('/:question_id/report', (req, res) => {

// })

module.exports = router;