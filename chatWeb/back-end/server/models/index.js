const config = require('../config/config');
const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: 3306,
    dialect: 'mysql',
  });
  




