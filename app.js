require("newrelic");
const express = require("express");
const questionsRouter = require("./controllers/questionsController");
const answersRouter = require("./controllers/answersController");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/qa/questions", questionsRouter);
app.use("/qa/answers", answersRouter);

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

module.exports = app;
