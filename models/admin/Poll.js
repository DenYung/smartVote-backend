const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const pollSchema = new Schema(
    {
        poll: {
            type: String,
            required: [true, "provide title of post"],
        },
        options: {
            type: Schema.Types.Mixed,
            default: {}
        }
    },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = model("Polls", pollSchema);
