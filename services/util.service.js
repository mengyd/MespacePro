'use strict';

const bcrypt = require('bcrypt');
const SALT_ROUND = 10;

module.exports = {
    async encryptPassword(password){
        try {
            return await bcrypt.hash(password, SALT_ROUND);
        } catch (err) {
            throw err;
        }
    },

    async comparePassword(password, encryptedPassword){
        try {
            return await bcrypt.compare(password, encryptedPassword);
        } catch (err) {
            throw err;
        }
    }
};