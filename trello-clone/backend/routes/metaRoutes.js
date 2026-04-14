const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/metaController");

router.get("/members", ctrl.getMembers);
router.get("/labels", ctrl.getLabels);

module.exports = router;