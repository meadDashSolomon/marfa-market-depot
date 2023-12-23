const mongoose = require("mongoose");

// create mongoose schema
const questionsSchema = new mongoose.Schema({
  id: Number,
  product_id: { type: Number, index: true },
  body: String,
  date_written: Date,
  asker_name: String,
  helpful: Number,
  reported: Number,
  asker_email: String,
  answers: Object,
});

// Create mongoose model
const Questions = mongoose.model("Question", questionsSchema);

// EC2 instance
// mongoose.connect("mongodb://mead:qwerty@3.138.106.236:27017/SDC", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// Local host
mongoose
  .connect("mongodb://127.0.0.1:27017/SDC", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
    Questions.createIndexes();
  })
  .catch((err) => console.error("MongoDB connection:", err));

exports.findQuestions = async (product_id) => {
  return Questions.find(
    { product_id: product_id },
    "body date_written asker_name helpful"
  )
    .limit(10)
    .exec();
};

exports.saveQuestion = async (question) => {
  const newQuestion = new Questions(question);
  return newQuestion.save();
};

exports.updateQuestion = async (question_id) => {
  return Questions.findOneAndUpdate(
    { id: question_id },
    { $inc: { helpful: 1 } },
    { new: true }
  ).exec();
};

exports.reportQuestion = async (question_id) => {
  return Questions.findOneAndUpdate(
    { id: question_id },
    { $inc: { reported: 1 } },
    { new: true }
  ).exec();
};
