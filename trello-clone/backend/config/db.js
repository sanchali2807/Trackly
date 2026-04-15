const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DB_URI) {
  // 🚀 Railway (production)
  sequelize = new Sequelize(process.env.DB_URI, {
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // 💻 Local (development)
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