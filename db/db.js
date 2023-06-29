const {connect} = require('mongoose');
const dotenve = require('dotenv').config();

const dbConnection = () => {
    connect(process.env.DB_URI)
        .then(() => console.log("Connect to Mongo DB"))
        .catch(err => console.log(err));
}

module.exports = dbConnection;