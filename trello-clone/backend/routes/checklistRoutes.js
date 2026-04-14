const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/checkListController");

router.post("/", ctrl.addItem);
router.put("/:id", ctrl.toggleItem);
router.delete("/:id", ctrl.deleteItem);

module.exports = router;