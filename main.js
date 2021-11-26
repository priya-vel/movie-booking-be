const express = require("express");
const { json, urlencoded } = express;
const { Config } = require("./config/index")
// initializing app
const app = express();


// initializing global middleware
app.use(urlencoded({extended: true}))
app.use(json())


// starting server
app.listen(Config.PORT, () => console.log(`server started at port ${Config.PORT}`))








