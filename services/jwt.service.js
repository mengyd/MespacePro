const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = {
    async createToken(payload, expiresIn) {
        return jwt.sign(payload, config.development.secret, {
            expiresIn: expiresIn
        })
    },

    async validToken(token) {
        try {
            const decoded = jwt.verify(token, config.development.secret);
            return decoded;
        } catch (err) {
            return err;
        }
    }
}