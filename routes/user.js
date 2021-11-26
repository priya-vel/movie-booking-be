const { UserService } = require("../services/user.service");

const UserRoute = require("express").Router()

UserRoute.get("/:id",async (req, res, next) => {
    let id = req.params.id;
    return UserService.getOne({ "_id": id })
    .then((data) => {
        
        res.status(200).json({user: data})
    }).catch((err) => {
        res.status(409).json({err})
    })
})


module.exports = UserRoute

