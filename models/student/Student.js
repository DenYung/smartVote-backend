const { model, Schema } = require("mongoose");

const studentSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "provide your first name"],
  },
  last_name: {
    type: String,
    required: [true, "provide your last name"],
  },
  faculty: {
    type: String,
    required: [true, "provide your faculty"],
  },
  email: {
    type: String,
    required: [true, "provide email"],
  },
  password: {
    type: String,
    required: [true, "provide your email"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Employee", studentSchema);
