const express = require('express');
const route = express.Router();
const {verifyToken, verifyAdminRole} = require('../middleware/auth')
const student = require('../controllers/Student');
const admin = require('../controllers/Admin');

route.post('/admin/register', admin.Register);
route.post('/admin/login', admin.Login);
route.get('/admin/students', [verifyToken, verifyAdminRole], admin.AllStudents);
route.get('/admin/admins', [verifyToken, verifyAdminRole], admin.AllAdmins);
route.get('/admin/me', [verifyToken, verifyAdminRole], admin.Me);
route.post('/admin/poll', [verifyToken, verifyAdminRole], admin.Polls);
route.get("/admin/poll", [verifyToken, verifyAdminRole], admin.AllPolls);

route.post('/student/register', student.Register);
route.post('/student/login', student.Login);
route.get('/student/me', verifyToken, student.Me);
route.post('/student/vote', verifyToken, student.Vote);
route.get('/student/feed', verifyToken, student.Feed);

module.exports = route;