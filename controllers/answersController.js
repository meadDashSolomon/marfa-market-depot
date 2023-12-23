const express = require("express");
const router = express.Router();
const {
  findAnswers,
  saveAnswer,
  updateAnswerHelpful,
  updateAnswerReported,
} = require("../models/answersModel");

router.get("/:question_id", async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const answers = await findAnswers(question_id);
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:question_id", async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const answer = req.body;
    const savedAnswer = await saveAnswer(question_id, answer);
    res.status(201).json(savedAnswer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:answer_id/helpful", async (req, res) => {
  try {
    const answer_id = req.params.answer_id;
    const updatedAnswer = await updateAnswerHelpful(answer_id);
    if (updatedAnswer) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Answer not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:answer_id/report", async (req, res) => {
  try {
    const answer_id = req.params.answer_id;
    const reportedAnswer = await updateAnswerReported(answer_id);
    if (reportedAnswer) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Answer not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
