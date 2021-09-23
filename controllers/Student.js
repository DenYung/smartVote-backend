const Student = require("../models/student/Student");
const {
  validateStudentRegistrationInput,
  validateLoginInput,
} = require("../validators/Validator");
const _ = require("lodash");
const { generateToken } = require("../auth/jwt");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  try {
    const { body } = req;
    //check if the input from student is valid
    const validInput = await validateStudentRegistrationInput.validateAsync(
      body
    );
    const { email, password, first_name, last_name, faculty } = validInput;

    //check if user is already available in the database
    const isAvailable = await Student.findOne({ email });
    if (isAvailable)
      return res.status(400).send("user with given email already exit");

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // build the student object to be stored in the db
    const student = {
      email,
      password: hashedPassword,
      first_name,
      last_name,
      faculty,
    };

    //save the student in the db
    const result = await Student.create(student);

    //generate accessToken
    const token = generateToken(result);

    //use lodash to select student data to be returned to the client
    const data = _.pick(result, [
      "first_name",
      "last_name",
      "faculty",
      "email",
    ]);

    return res
      .status(200)
      .send({ message: "Registration successful", registedUser: data, token });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const Login = async (req, res) => {
  try {
    //validate login inputs
    const input = await validateLoginInput.validateAsync(req.body);
    const { email } = input;

    //check if user is available in db
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).send("user not available");

    const { first_name, last_name } = student;

    //decrypt the password and compare
    const isValidPassword = await bcrypt.compare(
      input.password,
      student.password
    );

    if (!isValidPassword)
      return res.status(400).send("email or password invalid");

    //generate accessToken
    const token = generateToken(student);

    return res.status(200).send({
      message: "login successful",
      data: { first_name, last_name },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const Me = async (req, res) => {
  const { id } = req.user;
  const me = await Student.findById(id).select("-_id -__v -password");
  return res.status(200).send(me);
};

module.exports = {
  Register,
  Login,
  Me,
};
