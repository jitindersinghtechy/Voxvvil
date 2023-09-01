const jwt = require('jsonwebtoken');
exports.create = (data) => {
    return jwt.sign(data, process.env.JWT_PRIVATEKEY, { expiresIn: process.env.JWT_EXPIRES_IN });
}