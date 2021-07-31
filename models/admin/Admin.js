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
});

module.exports = new model("Admin", adminSchema);