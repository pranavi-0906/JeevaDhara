const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  password: String,
  beds: Number,
  doctors: [
    {
      doctor: String,
      start: String,
      end: String
    }
  ]
});

module.exports = mongoose.model("Hospital", hospitalSchema);
