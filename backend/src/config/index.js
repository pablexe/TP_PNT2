require('dotenv').config();

module.exports.Config = {
    port:process.env.PORT,
    mongouri:process.env.MONGO_URI,
    mongodbname:process.env.MONGO_DBNAME
};