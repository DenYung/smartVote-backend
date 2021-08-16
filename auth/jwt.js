const jwt = require('jsonwebtoken');
const secret = "secret12345yykjwt";

const generateToken = (user) => {
    return jwt.sign({id: user.id}, secret);
}

const generateAdminToken = (user) => {
    return jwt.sign({id: user.id, isAdmin: user.isAdmin}, secret)
}
module.exports = {
    generateToken,
    generateAdminToken
};