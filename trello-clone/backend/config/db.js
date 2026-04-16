// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// let sequelize;

// if (process.env.DB_URI) {
//   // 🚀 Railway (production)
//   console.log(process.env.DB_URI);
//   console.log("DB CONFIG:", {
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
// });
// sequelize = new Sequelize(process.env.DB_URI, {
//   dialect: "mysql",
//   logging: false,
// });
// } else {
//   // 💻 Local (development)
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: process.env.DB_HOST,
//       dialect: "mysql",
//       logging: false,
//     }
//   );
// }

// module.exports = sequelize;


const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.MYSQL_PUBLIC_URL) {
  console.log("Using Railway PUBLIC DB");

  sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL, {
    dialect: "mysql",
    logging: false,
  });
}

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