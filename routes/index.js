const AuthRoute = require("./auth");
const UserRoute = require("./user");


const Router = {
    User: UserRoute,
    Auth: AuthRoute
}


module.exports = Router


