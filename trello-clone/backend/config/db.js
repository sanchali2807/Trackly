const { Sequelize } = require("sequelize");

let sequelize;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
if (process.env.MYSQLHOST) {
  // 🚀 Railway
  console.log("Using Railway DB");

  sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
      dialect: "mysql",
      logging: false,
    }
  );

} else {
  // 💻 Local
  console.log("Using Local DB");

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      logging: false,
    }
  );
}

module.exports = sequelize;