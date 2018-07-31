const router = require("express").Router();
const savesController = require("../../controllers/savesController");

// Matches with "/db/comments"
router.route("/")
  .post(savesController.saveComment)
  .get(savesController.findComments)

module.exports = router;