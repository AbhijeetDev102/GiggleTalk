const { red } = require("colors");
const Sequelize = require("sequelize");
require("dotenv").config()
const dbName = process.env.DB_NAME;
const hostName = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.USER;

const sequelize = new Sequelize(dbName, dbUser,  dbPassword, {
    host: hostName,
    dialect:'mysql',
    logging: false,
    port: process.env.DB_PORT || 8000
});

(async function runSquelize() {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connection Has Been Established Successfully.".bold);
  } catch (error) {
    console.log("Unable to connect to the database:".red , error);
  }
})();

module.exports = sequelize;