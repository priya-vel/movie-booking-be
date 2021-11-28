const { Authorization, Authendication } = require("../middleware/auth");
const { TheaterModel } = require("../models/theater");
const { BookingService } = require("../services/booking.service");
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
      await BookingService.createBookingsForShow(data._id, req.body.theater)
      return res.status(200).json({ data });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }
);

ShowRoute.put(
  "/:id",
  Authendication(),
  Authorization(["owner"]),
  async (req, res) => {
    try {
      const data = await ShowService.updateShow({_id: req.params.id}, req.body);
      return res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }
)

ShowRoute.put(
  "/:id/book",
  Authendication(),
  async (req, res) => {
    try {
      const data = await BookingService.bookShow(req.params.id, req.user._id)
      return res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }
)

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
      const shows = await BookingService.getManyBookings({ show: req.params.id })
      const theater = await TheaterService.getOne({ _id: data.theater })
      return res.status(200).json({ data, shows, theater });
    } catch (err) {
      res.status(500).json({error: err})
    }
  }
)


module.exports = {
  ShowRoute,
};
