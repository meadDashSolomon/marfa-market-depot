const express = require("express");
const router = express.Router();
const {
  findQuestions,
  saveQuestion,
  updateQuestion,
  reportQuestion,
} = require("../models/questionsModel");

router.get("/", async (req, res) => {
  try {
    const product_id = req.query.product_id;
    const questions = await findQuestions(product_id);
    res.status(200).json(questions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const question = req.body;
    const savedQuestion = await saveQuestion(question);
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:question_id/helpful", async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const updatedQuestion = await updateQuestion(question_id);
    res.status(204).json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:question_id/report", async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const reportedQuestion = await reportQuestion(question_id);
    res.status(204).json(reportedQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
