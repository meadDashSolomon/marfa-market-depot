require("newrelic");
const express = require("express");
const questionsRouter = require("./controllers/questionsController");
const {
  fetchAnswers,
  addAnswer,
  markAnswerHelpful,
  markAnswerReported,
} = require("./controllers/answersController");

const app = express();
const port = 3000;

// Parses request bodies so that I can access request body with req.body
app.use(express.json());
app.use("/qa/questions", questionsRouter);

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

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

// Export Express app object without listening on any port for testing
module.exports = app;
