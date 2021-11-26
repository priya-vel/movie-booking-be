const express = require("express");
const { DBConnection } = require("./config/db");
const { json, urlencoded } = express;
const { Config } = require("./config/index")
// initializing app
const app = express();
DBConnection().then((res) => {
    console.log("Mongodb connected");
}).catch((err) => {
    console.error(err);
})


// initializing global middleware
app.use(urlencoded({extended: true}))
app.use(json())


// starting server
app.listen(Config.PORT, () => console.log(`server started at port ${Config.PORT}`))








