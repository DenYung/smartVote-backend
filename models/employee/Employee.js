const { model, Schema } = require('mongoose');

const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'provide your first name']
    },
    last_name: {
        type: String,
        required: [true, 'provide your last name']
    },
    department: {
        type: String,
        required: [true, 'provide the department your work in']
    },
    workID: {
        type: String,
        required: [true, 'provide your identification number']
    }
});

module.exports = model("Employee", employeeSchema);