const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  id: Number,
  product_id: { type: Number, index: true },
  body: String,
  date_written: Date,
  asker_name: String,
  helpful: { type: Number, default: 0 },
  reported: { type: Boolean, default: false },
  asker_email: String,
  answers: Object,
});

const Questions = mongoose.model("Question", questionsSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017/SDC", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Ensure indexes are created
Questions.createIndexes().catch((err) =>
  console.error("Error creating indexes:", err)
);

exports.findQuestions = (product_id) => {
  return Questions.find(
    { product_id: product_id },
    "body date_written asker_name helpful"
  )
    .limit(10)
    .exec();
};

exports.saveQuestion = (questionData) => {
  const question = new Questions(questionData);
  return question.save();
};

exports.updateQuestionHelpful = (question_id) => {
  return Questions.findOneAndUpdate(
    { id: question_id },
    { $inc: { helpful: 1 } },
    { new: true }
  ).exec();
};

exports.updateQuestionReported = (question_id) => {
  return Questions.findOneAndUpdate(
    { id: question_id },
    { reported: true },
    { new: true }
  ).exec();
};
