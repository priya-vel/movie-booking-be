const { connect } = require("mongoose");
const { Config } = require(".");


const DBConnection = () => {
    return connect(Config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}


module.exports = {
    DBConnection
}
