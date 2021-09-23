const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const pollSchema = new Schema({
    poll: {
        type: String,
        required: [true, 'provide title of post']
    },
    options: {
        type: String,
        required: [true, 'provide message']
    },
    duration: {
        type: Number,
        required: [true, 'provide duration of vote']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, 'ref is required']
    },
    vote: {
        type: Number,
        default: 0
    }
});

module.exports = model("Polls", pollSchema);