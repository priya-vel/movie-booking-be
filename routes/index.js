const AuthRoute = require("./auth");
const { ShowRoute } = require("./show");
const TheaterRoute = require("./theater");
const UserRoute = require("./user");


const Router = {
    User: UserRoute,
    Auth: AuthRoute,
    Theater: TheaterRoute,
    Show: ShowRoute
}


module.exports = Router


