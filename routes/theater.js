const { Authorization, Authendication } = require("../middleware/auth");
const { TheaterService } = require("../services/theater.service");

const TheaterRoute = require("express").Router();

TheaterRoute.post(
  "/",
  Authendication(),
  Authorization(["owner"]),
  async (req, res, next) => {
    let data = req.body;
    data.owner = req.user._id;
    return TheaterService.createOne(data)
    .then(res => {
        res.status(201).json({
            data: res
        })
    }).catch(err => {
        res.status(500).json({error: err})
    })
  }
);

module.exports = TheaterRoute;
