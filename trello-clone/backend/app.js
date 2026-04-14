const express = require("express");
const cors = require("cors");

const app = express();
const boardRoutes = require("./routes/boardRoutes");
const listRoutes = require("./routes/listRoutes");
const cardRoutes = require("./routes/cardRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
const metaRoutes = require("./routes/metaRoutes");
const searchRoutes = require("./routes/searchRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/board", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/checklist", checklistRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/search", searchRoutes);

module.exports = app;