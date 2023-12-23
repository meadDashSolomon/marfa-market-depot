const mongoose = require("mongoose");

// Define the Answers schema
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
// Define the Answers Photos schema
const answersPhotosSchema = new mongoose.Schema({
  answer_id: { type: Number, index: true },
  url: String,
});

// Create the model for Answers
const Answers = mongoose.model("Answer", answersSchema);
// Create the model for Answers Photos
const AnswersPhotos = mongoose.model("AnswersPhoto", answersPhotosSchema);

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

exports.findAnswers = (question_id) => {
  return Answers.aggregate([
    { $match: { question_id: Number(question_id) } },
    {
      $lookup: {
        from: "Answers Photos", // collection name
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

exports.saveAnswer = async (question_id, answer, photos) => {
  // First save the answer
  const newAnswer = new Answers({ ...answer, question_id });
  const savedAnswer = await newAnswer.save();

  // Then, if there are photos, save them to the Answers Photos collection
  if (photos && photos.length > 0) {
    // Use map to create multiple promises for each photo to be saved
    const photoSavePromises = photos.map((photoUrl) => {
      const newPhoto = new AnswersPhotos({
        answer_id: savedAnswer.id, // Use the saved answer's ID
        url: photoUrl,
      });
      return newPhoto.save();
    });
    // Wait for all photo save operations to complete
    await Promise.all(photoSavePromises);
  }

  // Return the saved answer and any saved photos
  return { answer: savedAnswer, photos };
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
