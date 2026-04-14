const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/cardController");

router.post("/", ctrl.createCard);
// Express matches routes top-to-bottom, so a dynamic route like /:id will treat "move" as the id and capture the request before /move is ever checked.
// this is called route shadowing
router.post("/cards/:cardId/labels/:labelId",ctrl.addLabelToCard);
router.delete("/cards/:cardId/labels/:labelId",ctrl.removeLabelFromCard);
router.post("/add-member", ctrl.addMemberToCard);
router.post("/remove-member", ctrl.removeMemberFromCard);
router.put("/move", ctrl.moveCard);
router.put("/:id", ctrl.updateCard);
router.delete("/:id", ctrl.deleteCard);
router.get("/:id", ctrl.getCardDetails);

module.exports = router;