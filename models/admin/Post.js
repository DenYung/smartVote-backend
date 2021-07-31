const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'provide title of post']
    },
    message: {
        type: String,
        required: [true, 'provide message']
    },
    duration: {
        type: Date,
        required: [true, 'provide duration of vote']
    },
    author: {
        type: Object
    },
    comments: {
        type: Array,
        required: false
    },
    votes: {
        type: Object(Array)
    }
});

module.exports = model("Posts", postSchema);