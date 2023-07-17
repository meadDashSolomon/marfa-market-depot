const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/SDC', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connected...'));

// create mongoose schema
const questionsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  body: String,
  date_written: Date,
  asker_name: String,
  helpful: Number,
  reported: Boolean,
  asker_email: String,
  answers: Object,
})

// Create mongoose model
const Questions = mongoose.model("Question", questionsSchema);

// define fetch questions function
exports.findQuestions = (product_id) => {
    return Questions.find({ product_id: product_id }).exec()
      .then((questions) => {
        console.log('FIND QUESITONS SUCCESSFUL::::::', questions);
        return questions;
      })
      .catch(err => {
        console.log('ERROR FINDING QUESTIONS::::::', err);
        throw err;
      });
}

exports.saveQuestion = (question) => {
  const newQuestion = new Questions(question);
  return newQuestion.save()
    .then((savedQuestion) => {
      console.log('SAVE QUESTION SUCCESSFUL:::::', savedQuestion);
      return savedQuestion;
    })
    .catch((err) => {
      console.log('ERROR SAVING QUESTION:::::', err);
      throw err;
    });
}