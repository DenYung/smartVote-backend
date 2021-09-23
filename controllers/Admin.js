const Admin = require("../models/admin/Admin");
const Student = require("../models/student/Student");
const Poll = require('../models/admin/Poll');
const { generateAdminToken } = require("../auth/jwt");
const {
  validateAdminRegistrationInput,
  validateLoginInput,
  validatePollInput
} = require("../validators/Validator");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const Register = async (req, res) => {
  try {
    const input = await validateAdminRegistrationInput.validateAsync(req.body);
    const { email, password, first_name, last_name } = input;

    //check if user with email already exist
    const admin = await Admin.findOne({ email });
    if (admin) return res.status(400).send("admin with email already exist");

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //build admin object to be stored in the db
    const info = {
      email,
      password: hashedPassword,
      first_name,
      last_name,
    };

    //save the info in the dp
    const result = await Admin.create(info);

    //generate access token for admin
    const token = generateAdminToken(result);

    //extract data to be sent to client
    const data = {
      message: "registration successful",
      data: _.pick(result, ["first_name", "last_name", "email", "isAdmin"]),
      token,
    };

    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const Login = async (req, res) => {
  try {
    //validate admin login input
    const input = await validateLoginInput.validateAsync(req.body);
    const { email, password } = input;

    //check if admin with email is available in db
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).send("user with email not found");

    //check if password is valid;
    const hashedPassword = admin.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if (!isValidPassword)
      return res.status(400).send("email or password invalid");

    //generate admin token
    const token = generateAdminToken(admin);

    //build data to be sent to client
    const data = {
      first_name: admin.first_name,
      last_name: admin.last_name,
      email: admin.email,
    };

    return res.status(200).send({ message: "login successful", data, token });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const AllStudents = async (req, res) => {
  const students = await Student.find().select("-_id -__v  -password");
  return res.status(200).send(students);
};

const AllAdmins = async (req, res) => {
  const admins = await Admin.find().select("-_id  -__v  -password");
  return res.status(200).send(admins)
}

const Me = async (req, res) => {
  const { id } = req.user;
  const me = await Admin.findById(id).select('-_id -__v -password');
  return res.status(200).send(me);
}


const Polls = async (req, res) => {
  try {
    const isValid = await validatePollInput.validateAsync(req.body);
    const { poll, options, duration } = isValid;
    const author = req.user.id;
    
    const newPoll = {
      poll,
      options,
      duration,
      author
    }

    const created = await Poll.create(newPoll);
    return res.status(200).send(created);

  } catch (error) {
    return res.status(400).send(error);
  }
}


module.exports = {
  Register,
  Login,
  AllStudents,
  AllAdmins,
  Me,
  Polls
};
