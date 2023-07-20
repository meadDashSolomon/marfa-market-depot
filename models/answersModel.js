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
})

mongoose.connect('mongodb://127.0.0.1:27017/SDC', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connected...'));

const Answers = mongoose.model("Answer", answersSchema);

Answers.createIndexes()
.then(() => console.log('Indexes created for Answers collection'))
.catch(err => console.log(err));


exports.findAnswers = (question_id) => {
  return Answers.find({ question_id: question_id }, 'body date_written answerer_name helpful').limit(10).exec()
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

exports.updateAnswer = (answer_id) => {
  return Answers.findOneAndUpdate(
    { id: answer_id },
    { $inc: { helpful: 1 } },
    { new: true } // This option returns the updated document when true. when false, it returns the doc pre update.
  ).exec()
  .then((updatedAnswer) => {
    console.log('MARK ANSWER AS HELPFUL SUCCESSFUL:::::', updatedAnswer);
    return updatedAnswer;
  })
  .catch((err) => {
    console.log('ERROR MARKING ANSWER AS HELPFUL:::::', err);
    throw err;
  });
}

exports.reportAnswer = (answer_id) => {
  return Answers.findOneAndUpdate(
    { id: answer_id },
    { $inc: { reported: 1 } },
    { new: true } // This option returns the updated document when true. when false, it returns the doc pre update.
  ).exec()
  .then((reportedAnswer) => {
    console.log('MARK ANSWER AS REPORTED SUCCESSFUL:::::', reportedAnswer);
    return reportedAnswer;
  })
  .catch((err) => {
    console.log('ERROR REPORTING ANSWER:::::', err);
    throw err;
  });
}