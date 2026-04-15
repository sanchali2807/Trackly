const app = require("./app");
const sequelize = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const models = require("./models"); // store it

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected");

    // 🔥 Ensure models are fully initialized
    Object.keys(models).forEach((model) => {
      console.log(`Loaded model: ${model}`);
    });
console.log(sequelize.models);
    // await sequelize.sync();
    console.log("✅ Tables created");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

startServer();