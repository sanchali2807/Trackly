const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");

router.get("/", boardController.getBoard);
router.post("/create", boardController.createBoard);

module.exports = router;