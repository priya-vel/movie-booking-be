const jwt = require("jsonwebtoken");
const { UserService } = require("./user.service");
const { Config } = require("../config");

const AuthService = {
  async createToken(userId) {
    var token = jwt.sign({ session: userId }, Config.SECRET, {
      expiresIn: "24h",
    });
    return token;
  },
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, Config.SECRET);
      if (!decoded) {
        throw "token expired"
      }
      return decoded.session;
    } catch (err) {
        return Promise.reject(err)
    }
  },
};

module.exports = AuthService;
