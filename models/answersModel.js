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

exports.findAnswers = (question_id) => {
  return Answers.aggregate([
    { $match: { question_id: Number(question_id) } },
    {
      $lookup: {
        from: "answersphotos", // the collection name in MongoDB should be the plural, lowercase form
        localField: "id", // the field in the answers collection
        foreignField: "answer_id", // the corresponding field in the Answers Photos collection
        as: "photos", // the field in which to put the joined documents
      },
    },
    {
      $project: {
        body: 1,
        date_written: 1,
        answerer_name: 1,
        helpful: 1,
        photos: 1, // include the joined photos in the output
      },
    },
    { $limit: 10 },
  ]).exec();
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
