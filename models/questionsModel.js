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
})

mongoose.connect('mongodb://127.0.0.1:27017/SDC', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connected...'));

// Create mongoose model
const Questions = mongoose.model("Question", questionsSchema);

// Create indexes after connecting to the database
Questions.createIndexes()
      .then(() => console.log('Indexes created for Questions collection'))
      .catch(err => console.log(err));

// define fetch questions function
// see mongoose syntax for field optimization
// https://mongoosejs.com/docs/api/model.html#Model.find()
exports.findQuestions = (product_id) => {
  return Questions.find({ product_id: product_id }, 'body date_written asker_name helpful').limit(10).exec()
    .then((questions) => {
      console.log('FIND QUESITONS SUCCESSFUL::::::', questions);
      return questions;
    })
    .catch(err => {
      console.log('ERROR FINDING QUESTIONS::::::', err);
      throw err;
    });
}

// exports.findQuestions = (product_id) => {
//   return Questions.countDocuments({ product_id: product_id })
//     .then((count) => {
//       const lastTenPercent = Math.floor(count * 0.1);
//       const skipCount = count - lastTenPercent;
//       return Questions.find({ product_id: product_id }, 'body date_written asker_name helpful').skip(skipCount).limit(10).exec()
//     })
//     .then((questions) => {
//       console.log('FIND QUESITONS SUCCESSFUL::::::', questions);
//       return questions;
//     })
//     .catch(err => {
//       console.log('ERROR FINDING QUESTIONS::::::', err);
//       throw err;
//     });
// }

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

exports.updateQuestion = (question_id) => {
  return Questions.findOneAndUpdate(
    { id: question_id },
    { $inc: { helpful: 1 } },
    { new: true } // This option returns the updated document when true. when false, it returns the doc pre update.
  ).exec()
  .then((updatedQuestion) => {
    console.log('MARK QUESTION AS HELPFUL SUCCESSFUL:::::', updatedQuestion);
    return updatedQuestion;
  })
  .catch((err) => {
    console.log('ERROR MARKING QUESTION AS HELPFUL:::::', err);
    throw err;
  });
}

exports.reportQuestion = (question_id) => {
  return Questions.findOneAndUpdate(
    { id: question_id },
    { $inc: { reported: 1 } },
    { new: true } // This option returns the updated document when true. when false, it returns the doc pre update.
  ).exec()
  .then((reportedQuestion) => {
    console.log('MARK QUESTION AS REPORTED SUCCESSFUL:::::', reportedQuestion);
    return reportedQuestion;
  })
  .catch((err) => {
    console.log('ERROR REPORTING QUESTION:::::', err);
    throw err;
  });
}

// helper function for testing mark question helpful/update question route
exports.getQuestion = (question_id) => {
  return Questions.findOne({ id: question_id }).exec()
    .then((question) => {
      console.log('GET QUESTION SUCCESSFUL:::::', question);
      return question;
    })
    .catch(err => {
      console.log('ERROR GETTING QUESTION::::::', err);
      throw err;
    });
}
