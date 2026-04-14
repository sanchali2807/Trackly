const sequelize = require("../config/db");
const {
  Member,
  Label,
} = require("../models");

async function seed() {
  try {
    // ======================
    // MEMBERS
    // ======================
    await Member.bulkCreate([
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
    ]);

    // ======================
    // LABELS
    // ======================
    await Label.bulkCreate([
      { name: "Urgent", color: "red" },
      { name: "Feature", color: "blue" },
      { name: "Bug", color: "green" },
    ]);

    console.log("✅ Seeding completed!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seed();