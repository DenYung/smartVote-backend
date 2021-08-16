const express = require('express');
const route = express.Router();
const student = require('../controllers/Student');
const admin = require('../controllers/Admin');

route.post('/admin/register', admin.Register);

route.post('/student/register', student.Register);
route.post('/student/login', student.Login);

module.exports = route;