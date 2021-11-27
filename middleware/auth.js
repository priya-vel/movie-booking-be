const AuthService = require("../services/auth.service");
const { UserService } = require("../services/user.service");

const Authendication = () => {
  return async function (req, res, next) {
    try {
      let authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(403).json({ error: "unauthorized" });
        return;
      }
      let tokenArr = String(authHeader).split(" ");
      if (tokenArr.length != 2) {
        res.status(403).json({ error: "invalid token" });
        return;
      }
      if (tokenArr[0] != "Barear") {
        res.status(403).json({ error: "invalid token" });
        return;
      }
      const resp = await AuthService.verifyToken(tokenArr[1]);
      const dbUser = await UserService.getOne({ _id: resp });
      req.user = dbUser;
      next();
    } catch (err) {
      res.status(403).json({ error: err });
    }
  };
};

const Authorization = (types) => {
  return async function (req, res, next) {
    try {
      for (let i = 0; i < types.length; i++) {
        const userType = types[i];
        if (userType == req.user.type) {
          next();
          return;
        }
      }
      throw "not authorized";
    } catch (err) {
      res.status(403).json({ error: err });
    }
  };
};

module.exports = {
  Authendication,
  Authorization,
};
