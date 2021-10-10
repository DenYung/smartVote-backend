const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const pollSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "provide title of post"],
    },
    participants: {
      type: Schema.Types.Mixed,
      default: {},
    },
    pics: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = model("Polls", pollSchema);
