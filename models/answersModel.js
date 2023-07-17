const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/SDC', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connected...'));

const answersSchema = new mongoose.Schema({
  id: Number,
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
})

const Answers = mongoose.model("Answer", answersSchema);

exports.findAnswers = (question_id) => {
  return Answers.find({ question_id: question_id })
    .then((answers) => {
      console.log('FIND ANSWERS SUCCESSFULL:::::::', answers);
      return answers;
    })
    .catch(err => {
      console.log('ERROR FINDING ANSWERS::::::', err);
      throw err;
    });
}

exports.saveAnswer = (question_id, answer) => {
  const newAnswer = new Answers({
    ...answer,
    question_id: question_id,
  });

  return newAnswer.save()
    .then((savedAnswer) => {
      console.log('SAVE ANSWER SUCCESSFULLY:::::', savedAnswer);
      return savedAnswer;
    })
    .catch((err) => {
      console.log('ERROR SAVING ANSWER:::::', err);
      throw err;
    });
}