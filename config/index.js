// loading env file
require("dotenv").config();

// env variables for app reference
const Config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SECRET: process.env.SECRET,
    EMAIL: process.env.EMAIL,
    PASS_IV: process.env.PASS_IV,
    PASS_DATA: process.env.PASS_DATA,
    PASS_KEY: process.env.PASS_KEY,
}


module.exports ={
    Config
}