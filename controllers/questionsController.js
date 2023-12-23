const express = require("express");
const router = express.Router();
const {
  findQuestions,
  saveQuestion,
  updateQuestionHelpful,
  updateQuestionReported,
} = require("../models/questionsModel");

router.get("/", async (req, res) => {
  try {
    const product_id = req.query.product_id;
    if (!product_id) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const questions = await findQuestions(product_id);
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const question = req.body;
    const savedQuestion = await saveQuestion(question);
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:question_id/helpful", async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const updatedQuestion = await updateQuestionHelpful(question_id);
    if (updatedQuestion) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Question not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:question_id/report", async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const reportedQuestion = await updateQuestionReported(question_id);
    if (reportedQuestion) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Question not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
