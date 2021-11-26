const AuthService = require("../services/auth.service");
const { UserService } = require("../services/user.service");
const bcrypt = require("bcryptjs")

const AuthRoute = require("express").Router()

AuthRoute.post("/register", async (req, res) => {
    try {
        let body = req.body;
        const dbUser = await UserService.getOne({ email: body.email })
        if (!!dbUser) {
            throw "user with same email already exists"
        }
        const resData = await UserService.createOne(body);
        const token = await AuthService.createToken(resData._id);
        res.status(201).json({token})
    } catch (err) {
        res.status(409).json({error: err})
    }
})

AuthRoute.post("/login", async (req, res) => {
    try {
        let body = req.body;
        const dbUser = await UserService.getOne({ email: body.email })
        if (!dbUser) {
            throw "user not found"
        }
        if(!bcrypt.compare(body.password, dbUser.password)) {
            return res.status(403).json({
                error: "Invalid credentials"
            })
        }
        const token = await AuthService.createToken(dbUser._id)
        console.log(token);
        return res.status(200).json({
            token,
        })
    } catch (err) {
        console.log(err);
        res.status(409).json({error: err})
    }
})


module.exports = AuthRoute;