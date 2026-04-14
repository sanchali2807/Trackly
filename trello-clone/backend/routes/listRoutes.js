const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/listController");

router.post("/", ctrl.createList);
router.put("/reorder", ctrl.reorderLists);
router.put("/:id", ctrl.updateList);
router.delete("/:id", ctrl.deleteList);

module.exports = router;