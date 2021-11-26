const jwt = require('jsonwebtoken');
const { Config } = require('../config');


const AuthService = {
    async createToken(userId) {
        var token = jwt.sign({ session: userId }, Config.SECRET, { expiresIn: '24h' });
        return token
    }
}


module.exports = AuthService;
