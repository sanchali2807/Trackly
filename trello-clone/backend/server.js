const app = require("./app");
const sequelize = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected");

    require("./models");
    await sequelize.sync(); // later we’ll use migrations
    console.log("✅ Models Synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

startServer();