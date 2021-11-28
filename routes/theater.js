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
    data.shows = []
    console.log(data);
    return TheaterService.createOne(data)
    .then(data => {
        res.status(201).json({
            data
        })
    }).catch(err => {
      console.log(err);
        res.status(500).json({error: err})
    })
  }
);

TheaterRoute.get(
  "/my",
  Authendication(),
  Authorization(["owner"]),
  async (req, res) => {
    const owner = req.user._id;
    return TheaterService.getMany({
      owner, 
    })
    .then(data => {
        res.status(200).json({
            data
        })
    }).catch(err => {
      console.log(err);
        res.status(500).json({error: err})
    })
  }
)


TheaterRoute.get(
  "/:id",
  async (req, res) => {
    return TheaterService.getOne({
      _id: req.params.id, 
    })
    .then(data => {
        res.status(200).json({
            data
        })
    }).catch(err => {
      console.log(err);
        res.status(500).json({error: err})
    })
  }
)



TheaterRoute.put(
  "/:id",
  async (req, res) => {
    return TheaterService.updateOne({
      _id: req.params.id, 
    }, {
      name: req.body.name
    })
    .then(data => {
        res.status(200).json({
            data
        })
    }).catch(err => {
      console.log(err);
        res.status(500).json({error: err})
    })
  }
)

module.exports = TheaterRoute;
