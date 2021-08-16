const { model, Schema } = require('mongoose');

const adminSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "provide name"]
    },
    last_name: {
        type: String,
        required: [true, 'please provide name']
    },
    email: {
        type: String,
        required: [true, 'please provide email']
    },
    password: {
        type: String,
        required: [true, 'provide password']
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
});

module.exports = new model("Admin", adminSchema);