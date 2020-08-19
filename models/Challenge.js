const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: "group",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("challenge", ChallengeSchema);
