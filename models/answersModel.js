const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema({
  id: Number,
  question_id: { type: Number, index: true },
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number,
});

const Answers = mongoose.model("Answer", answersSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017/SDC", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
    Answers.createIndexes();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// EC2 instance
// mongoose.connect('mongodb://mead:qwerty@3.138.106.236:27017/SDC', {
//   useNewUrlParser: true, useUnifiedTopology: true
// })

exports.findAnswers = async (question_id) => {
  return Answers.find(
    { question_id: question_id },
    "body date_written answerer_name helpful"
  )
    .limit(10)
    .exec();
};

exports.saveAnswer = async (question_id, answer) => {
  const newAnswer = new Answers({ ...answer, question_id });
  return newAnswer.save();
};

exports.updateAnswer = async (answer_id) => {
  return Answers.findOneAndUpdate(
    { id: answer_id },
    { $inc: { helpful: 1 } },
    { new: true }
  ).exec();
};

exports.reportAnswer = async (answer_id) => {
  return Answers.findOneAndUpdate(
    { id: answer_id },
    { $inc: { reported: 1 } },
    { new: true }
  ).exec();
};
