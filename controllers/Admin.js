const Admin = require("../models/admin/Admin");
const { generateAdminToken } = require("../auth/jwt");
const { validateAdminRegistrationInput } = require('../validators/Validator');
const { validate } = require("../models/student/Student");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const Register = async (req, res) => {
    try {
        const input = await validateAdminRegistrationInput.validateAsync(req.body);
        const { email, password, first_name, last_name } = input;

        //check if user with email already exist
        const admin = await Admin.findOne({ email });
        if (admin) return res.status(400).send("admin with email already exist");

        const hashedPassword = await bcrypt.hash(password, 10);

        const info = {
            email,
            password: hashedPassword,
            first_name,
            last_name
        };

        const result = await Admin.create(info);

        const token = generateAdminToken(result);

        const data = {
            message: 'registration successful',
            data: _.pick(result, ['first_name', 'last_name', 'email', 'isAdmin']),
            token
        }
        
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}

module.exports = {
    Register
}