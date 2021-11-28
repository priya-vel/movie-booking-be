const { Authendication, Authorization } = require("../middleware/auth");
const { UserService } = require("../services/user.service");

const UserRoute = require("express").Router();

UserRoute.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  return UserService.getOne({ _id: id })
    .then((data) => {
      res.status(200).json({ user: data });
    })
    .catch((err) => {
      res.status(409).json({ err });
    });
});

UserRoute.get("/profile/me", Authendication(), async (req, res, next) => {
  console.log(req.user);
  let data = {
    email: req.user.email,
    name: req.user.name,
    type: req.user.type,
  };
  delete data.password;
  res.status(200).json({ data: req.user });
});

module.exports = UserRoute;
