// loading env file
require("dotenv").config();

// env variables for app reference
const Config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
}


module.exports ={
    Config
}