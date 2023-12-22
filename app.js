require("newrelic");
const express = require("express");
const {
  fetchQuestions,
  addQuestion,
  markQuestionHelpful,
  markQuestionReported,
} = require("./controllers/questionsController");
const {
  fetchAnswers,
  addAnswer,
  markAnswerHelpful,
  markAnswerReported,
} = require("./controllers/answersController");
const app = express();
const port = 3000;

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

/**
 * Get Requests
 */
// Retrieves a list of questions for a particular product
app.get("/qa/questions", (req, res) => {
  const product_id = req.query.product_id;
  fetchQuestions(product_id, res)
    .then((questions) => {
      console.log("APP.JS SUCCESSFULLY FETCHED QUESTIONS:::::", questions);
    })
    .catch((err) => {
      console.log("APP.JS - ERROR FETCHING QUESTIONS:::::", err);
    });
});

// Returns answers for a given question
app.get("/qa/questions/:question_id/answers", (req, res) => {
  const question_id = req.params.question_id;
  fetchAnswers(question_id, res)
    .then((answers) => {
      console.log("APP.JS SUCCESSFULLY FETCHED ANSWERS:::::", answers);
    })
    .catch((err) => {
      console.log("APP.JS ERROR FETCHING QUESTIONS:::::", err);
    });
});

/**
 * Post Requests
 */
// middleware that parses request bodies so that I can access request body with req.body
app.use(express.json());

// Saves question for a particular product
app.post("/qa/questions", (req, res) => {
  const question = req.body;
  addQuestion(question, res)
    .then((savedQuestion) => {
      console.log("APP.JS SUCCESSFULLY SAVED QUESTION:::::", savedQuestion);
    })
    .catch((err) => {
      console.log("APP.JS - ERROR SAVING QUESTION:::::", err);
    });
});

// Saves answer
app.post("/qa/questions/:question_id/answers", (req, res) => {
  const question_id = req.params.question_id;
  const answer = req.body;
  addAnswer(question_id, answer, res)
    .then((savedAnswer) => {
      console.log("APP.JS SUCCESSFULLY SAVED ANSWER::::", savedAnswer);
    })
    .catch((err) => {
      console.log("APP.JS ERROR SAVING ANSWER:::::", err);
    });
});

/**
 * Put Requests
 */
// Mark question helpful
app.put("/qa/questions/:question_id/helpful", (req, res) => {
  const question_id = req.params.question_id;
  markQuestionHelpful(question_id, res)
    .then((updatedQuestion) => {
      console.log("APP.JS SUCCESSFULLY MARKED Q HELPFUL:::::", updatedQuestion);
    })
    .catch((err) => {
      console.log("APP.JS ERROR MARKING QUESTION HELPFUL:::::", err);
    });
});

// Report question
app.put("/qa/questions/:question_id/report", (req, res) => {
  const question_id = req.params.question_id;
  markQuestionReported(question_id, res)
    .then((reportedQuestion) => {
      console.log(
        "APP.JS SUCCESSFULLY Reported Question:::::",
        reportedQuestion
      );
    })
    .catch((err) => {
      console.log("APP.JS ERROR REPORTING QUESTION:::::", err);
    });
});

// Mark answer helpful
app.put("/qa/answers/:answer_id/helpful", (req, res) => {
  const answer_id = req.params.answer_id;
  markAnswerHelpful(answer_id, res)
    .then((updatedAnswer) => {
      console.log(
        "APP.JS SUCCESSFULLY MARKED ANSWER HELPFUL:::::",
        updatedAnswer
      );
    })
    .catch((err) => {
      console.log("APP.JS ERROR MARKING ANSWER HELPFUL:::::", err);
    });
});

// Mark question helpful
app.put("/qa/answers/:answer_id/report", (req, res) => {
  const answer_id = req.params.answer_id;
  markAnswerReported(answer_id, res)
    .then((reportedAnswer) => {
      console.log("APP.JS SUCCESSFULLY REPORTED ANSWER:::::", reportedAnswer);
    })
    .catch((err) => {
      console.log("APP.JS ERROR REPORTING ANSWER:::::", err);
    });
});

// Export Express app object without listening on any port for testing
module.exports = app;
