const dotenv = require('dotenv')
dotenv.config();

const dbconfig = {
        host: "localhost",
        user: "chatm",
        password: process.env.DATABASE_PASSWORD,
        database: "chatdb",
        port:3306
    }

module.exports = dbconfig; 