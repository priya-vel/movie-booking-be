const { Authorization, Authendication } = require("../middleware/auth");
const { TheaterModel } = require("../models/theater");
const { ShowService } = require("../services/show.service");
const { TheaterService } = require("../services/theater.service");

const ShowRoute = require("express").Router();

ShowRoute.post(
  "/",
  Authendication(),
  Authorization(["owner"]),
  async (req, res) => {
    try {
      const data = await ShowService.createShow(req.body);
      await TheaterService.addShow({ _id: req.body.theater }, data._id);
      return res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }
);

ShowRoute.get(
  "/",
  async (req, res) => {
    try {
      const data = await ShowService.getShows({})
      return res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({error: err})
    }
  }
)

ShowRoute.get(
  "/:id",
  async (req, res) => {
    try {
      const data = await ShowService.getOne(req.params.id)
      return res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({error: err})
    }
  }
)


module.exports = {
  ShowRoute,
};
