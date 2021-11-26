const { UserService } = require("../services/user.service");

const AuthRoute = require("express").Router()

AuthRoute.post("/register", async (req, res) => {
    try {
        let body = req.body;
        const dbUser = await UserService.getOne({ email: body.email })
        if (!!dbUser) {
            throw "user with same email already exists"
        }
        const resData = await UserService.createOne(body);
        res.status(201).json({data: resData})
    } catch (err) {
        res.status(409).json({error: err})
    }
})


module.exports = AuthRoute;