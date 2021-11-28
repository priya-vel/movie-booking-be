const express = require("express");
const { DBConnection } = require("./config/db");
const { json, urlencoded } = express;
const { Config } = require("./config/index");
const Router = require("./routes");
const cors = require("cors");
// initializing app
const app = express();
DBConnection().then((res) => {
    console.log("Mongodb connected");
}).catch((err) => {
    console.error(err);
})

// initializing global middleware
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())

// registering routes
app.use("/user", Router.User)
app.use("/auth", Router.Auth)
app.use("/theater", Router.Theater)
app.use("/show", Router.Show)


// starting server
app.listen(Config.PORT, () => console.log(`server started at port ${Config.PORT}`))








